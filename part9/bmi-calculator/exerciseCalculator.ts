
export interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (exerciseHours: number[], target: number): Result => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(hours => hours > 0).length;
    const totalHours = exerciseHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;

    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average <= target) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
      } else if (average < target) {
        rating = 1;
        ratingDescription = "needs improvement";
      } else {
        rating = 3;
        ratingDescription = 'excellent work';
      }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

const parseArgs = (args: string[]): { target: number; exerciseHours: number[] } => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[2]);
    if (isNaN(target)) throw new Error('Target value is not a number');

    const exerciseHours = args.slice(3).map(arg => {
        const hours = Number(arg);
        if (isNaN(hours)) throw new Error('Exercise hours is not a number');
        return hours;
    });
    return { target, exerciseHours };
};

try {
    const { target, exerciseHours } = parseArgs(process.argv);
    const result = calculateExercises(exerciseHours, target);
    console.log(result); 
} catch (error: unknown) {
    let errorMessage = 'SOMETHING BAD HAPPEN';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

// const exerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
// const targetHours = 2;

// const result = calculateExercises(exerciseHours, targetHours);
// console.log(result);