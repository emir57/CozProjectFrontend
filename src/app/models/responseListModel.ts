import ResponseModel from "./responseModel";

export default interface ResponseListModel<T> extends ResponseModel {
  data: T[];
}
