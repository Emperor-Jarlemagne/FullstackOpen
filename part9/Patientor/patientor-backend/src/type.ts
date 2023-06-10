export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    occupation: string;
};