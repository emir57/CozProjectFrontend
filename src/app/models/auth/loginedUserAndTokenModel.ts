import LoginedUser from "./loginedUserModel";
import TokenModel from "./tokenModel";

export default interface LoginedUserAndTokenModel {
  user: LoginedUser;
  token: TokenModel;
}
