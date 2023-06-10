import patients from '../../data/patients';
import { Patient } from '../type';

const getPatientsWithoutSsn = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ ssn, ...patient }) => patient);
};

export default {
  getPatientsWithoutSsn
};