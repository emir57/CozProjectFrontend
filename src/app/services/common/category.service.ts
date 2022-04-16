import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import ResponseModel from 'src/app/models/responseModel';
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
}
