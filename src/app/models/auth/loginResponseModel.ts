import ResponseModel from "../responseModel";
import LoginedUser from "./loginedUserModel";
import TokenModel from "./tokenModel";

export default interface LoginResponseModel extends ResponseModel {
  user: LoginedUser;
  token: TokenModel;
}
