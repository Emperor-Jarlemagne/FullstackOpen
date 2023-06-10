import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../type';

const getDiagnoses = (): Diagnose[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};