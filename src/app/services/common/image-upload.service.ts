import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { fileURLToPath } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private platform: Platform) { }

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
    const base46Data = "";
    const fileName = new Date().getTime() + ".jpeg";
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base46Data
    })
  }

  async readAsBase64(photo: Photo) {
    if (this.platform.is("hybrid")) {
      const file = await Filesystem.readFile({
        path: photo.path
      })
      return file.data;
    };

  }


}

export interface LocalFile {
  name: string;
  path: string;
  data: string;
}
export const IMAGE_DIR = "stored-images";
