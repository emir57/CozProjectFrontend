import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  images: LocalFile[] = [];
  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private platform: Platform,
    private loadingCtrl: LoadingController
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
      console.log("HERE: ", result.files.length);
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
      this.saveImage(image);
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


}

export interface LocalFile {
  name: string;
  path: string;
  data: string;
}
export const IMAGE_DIR = "stored-images";
