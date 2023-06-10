import express from 'express';
import patientsService from '../services/patientService';
import { Patient } from '../type';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: Omit<Patient, 'ssn'>[] = patientsService.getPatientsWithoutSsn();
  res.json(patients);
});

export default router;