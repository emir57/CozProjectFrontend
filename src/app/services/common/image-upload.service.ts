import { Injectable } from '@angular/core';

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
