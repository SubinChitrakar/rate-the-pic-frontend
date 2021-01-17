export class UserModel {
  public admin = false;
  constructor(
    public email: string,
    public password: string,
    public confirmPassword: string
  ){}
}
