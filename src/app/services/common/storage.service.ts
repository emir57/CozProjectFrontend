import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setName(key: KeyType, value: any) {
    await Storage.set({
      key: key,
      value: JSON.stringify(value)
    });
  }

  async removeName(key: KeyType) {
    await Storage.remove({
      key: key
    })
  }

  async checkName(key: KeyType) {
    const { value } = await Storage.get({ key: key });
    return await value;
  }
}

export enum KeyType {
  User = "user",
  Token = "token"
}
