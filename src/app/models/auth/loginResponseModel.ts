import ResponseModel from "../responseModel";
import LoginedUserAndTokenModel from "./loginedUserAndTokenModel";
import LoginedUser from "./loginedUserModel";
import TokenModel from "./tokenModel";

export default interface LoginResponseModel extends ResponseModel {
  data: LoginedUserAndTokenModel;
}
