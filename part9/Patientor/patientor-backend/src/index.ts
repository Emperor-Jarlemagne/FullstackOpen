import express from 'express';
import diagnosesRouter from './routes/diagnosesRouting';
import patientsRouter from './routes/patientsRouting';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/patients', patientsRouter)

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});