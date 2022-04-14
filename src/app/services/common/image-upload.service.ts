import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';
import { SweetalertService } from './sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  images: LocalFile[] = [];
  error: any;
  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private messageService: SweetalertService
  ) { }

  async loadFiles() {
    this.images = [];
    const loading = await this.loadingCtrl.create({
      message: "Yükleniyor..",
    });
    await loading.present();
    Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR
    }).then(result => {
      this.loadFileData(result.files);
    }, async err => {
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: IMAGE_DIR
      })
    }).then(_ => {
      loading.dismiss();
    })
  }
  async loadFileData(fileNames: string[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f}`;

      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath
      });
      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`
      });
    }
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 70,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    if (image) {
      // this.saveImage(image);
      const base46Data = await this.readAsBase64(image);
      this.startUpload({
        data: `${base46Data}`,
        name: "a",
        path: ""
      })
    }
  }

  async saveImage(photo: Photo) {
    const base46Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime() + ".jpeg";
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base46Data
    })
    this.loadFiles();
    setTimeout(() => {
      this.startUpload(this.images[0]);
      this.deleteFiles();
    }, 1000);

  }

  async readAsBase64(photo: Photo) {
    if (this.platform.is("hybrid")) {
      const file = await Filesystem.readFile({
        path: photo.path
      })
      return file.data;
    }
    else {
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  })

  async startUpload(file: LocalFile) {
    const response = await fetch(file.data);
    let url = `${this.baseUrl}api/images/upload`;
    const blob = await response.blob();
    let formData = new FormData();
    formData.append("file", blob, file.name);

    this.http.post(url, formData).subscribe(response => {
      // this.error = "data"+JSON.stringify(file.data)
    }, err => {
      // this.error = "data"+JSON.stringify(file.data);
    })
  }
  async deleteFiles() {
    for (let image of this.images) {
      await Filesystem.deleteFile({
        directory: Directory.Data,
        path: image.path
      });
    }
    this.loadFiles();
  }
}

export interface LocalFile {
  name: string;
  path: string;
  data: string;
}
export const IMAGE_DIR = "stored-images";
