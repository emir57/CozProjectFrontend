import LoginedUser from "./loginedUserModel";
import TokenModel from "./tokenModel";

export default interface LoginResponseModel {
  user: LoginedUser;
  token: TokenModel;
}
