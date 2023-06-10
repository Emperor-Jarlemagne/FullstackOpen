import express from 'express';
import diagnosesService from '../services/diagnosesService';
import { Diagnose } from '../type';

const router = express.Router();

router.get('/', (_req, res) => {
    const diagnoses: Diagnose[] = diagnosesService.getDiagnoses();
    res.json(diagnoses);
});

export default router;