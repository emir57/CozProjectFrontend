import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  images: LocalFile[] = [];
  constructor(
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
      result.files.forEach(e=>{
        this.images.push({path:e,data:"",name:""})
      })
    }, async err => {
      console.log("err: ", err);
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: IMAGE_DIR
      })
    }).then(_ => {
      loading.dismiss();
    })
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 70,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    console.log(image)
    if (image) {
      this.saveImage(image);
    }
  }

  async saveImage(photo: Photo) {
    const base46Data = await this.readAsBase64(photo);
    console.log(base46Data);
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
