import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import ResponseListModel from 'src/app/models/responseListModel';
import ResponseModel from 'src/app/models/responseModel';
import ResponseSingleModel from 'src/app/models/responseSingleModel';
import { CategoryModel } from 'src/app/models/tables/categoryMode';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }

  add(categoryModel: CategoryModel) {
    let url = `${this.baseUrl}api/categories/add`;
    return this.http.post<ResponseModel>(url, categoryModel)
  }
  update(categoryModel: CategoryModel) {
    let url = `${this.baseUrl}api/categories/update`;
    return this.http.put<ResponseModel>(url, categoryModel)
  }
  delete(categoryId: number) {
    let url = `${this.baseUrl}api/categories/delete?id=${categoryId}`;
    return this.http.delete<ResponseModel>(url)
  }
  getById(categoryId: number) {
    let url = `${this.baseUrl}api/categories/getbyid?id=${categoryId}`;
    return this.http.get<ResponseSingleModel<CategoryModel>>(url);
  }
  getall() {
    let url = `${this.baseUrl}api/categories/getall`;
    return this.http.get<ResponseListModel<CategoryModel>>(url);
  }
  getallWithCheckComplete(userId: number) {
    let url = `${this.baseUrl}api/categories/getallwithcheckcomplete?userId=${userId}`;
    return this.http.get<ResponseListModel<CategoryModel>>(url);
  }
}
