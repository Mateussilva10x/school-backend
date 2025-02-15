export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'TEACHER';
  password?: string;
  token?: string;
}
