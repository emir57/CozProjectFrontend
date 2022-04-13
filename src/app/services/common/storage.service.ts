import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setName(key: string, value: any) {
    await Storage.set({
      key: key,
      value: JSON.stringify(value)
    });
  }

  async removeName(key: string) {
    await Storage.remove({
      key: key
    })
  }

  async checkName(key: string) {
    const { value } = await Storage.get({ key: key });
    return value;
  }
}

export enum KeyType {
  User = "user",
  Token = "token"
}
