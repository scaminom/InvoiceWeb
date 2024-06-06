export interface ILoginResponse {
  id: number;
  token: string;
  expirationTime: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
}
