import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

const SECRET_KEY = process.env.JWT_SECRET || 'my-secret-key';

// Mock de usuários (futuro banco de dados)
const users: User[] = [
  { id: '1', email: 'admin@school.com', role: 'ADMIN', password: bcrypt.hashSync('admin123', 10) },
  { id: '2', email: 'teacher@school.com', role: 'TEACHER', password: bcrypt.hashSync('teacher123', 10) }
];

// Gerar token JWT
const generateToken = (user: User): string => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
};

// Login
export const login = async (email: string, password: string) => {
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password!)) {
    throw new Error('Credenciais inválidas');
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    token: generateToken(user)
  };
};
