import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';
import reportRoutes from './routes/reportRoutes';
import classRoutes from './routes/classRoutes';
import teacherRoutes from './routes/teacherRoutes';
import subjectRoutes from './routes/subjectRoutes';
import gradesRoutes from './routes/gradesRoutes';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/grades', gradesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
