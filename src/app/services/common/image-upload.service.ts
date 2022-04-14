import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor() { }

}

export interface LocalFile {
  name: string;
  path: string;
  data: string;
}
export const IMAGE_DIR = "stored-images";
