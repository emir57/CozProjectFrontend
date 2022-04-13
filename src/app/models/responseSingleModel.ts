import ResponseModel from "./responseModel";

export default interface ResponseSingleModel<T> extends ResponseModel {
  data: T;
}
