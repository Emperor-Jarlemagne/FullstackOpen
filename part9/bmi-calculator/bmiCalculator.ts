
export type BmiCategory = 'Underweight' | 'Normal (healthy weight)' | 'Overweight' | 'Obese';

export interface BmiResponse {
    weight: number;
    height: number;
    bmi: BmiCategory;
}

// const parseArguments = (args: string[]): BmiResponse => {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');
//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             value1: Number(args[2]),
//             value2: Number(args[3])
//         };
//     } else {
//         throw new Error('Provided values were not numbers!');
//     }
// }

export const calculateBmi = (height: number, weight: number): BmiCategory => {
    // Convert height from CM to M
    const heightInMeters = height / 100;
    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let category: BmiCategory;
    //Determine the message based on the BMI
    switch (true) {
        case bmi < 18.5:
            category = "Underweight";
            break;
        case bmi >= 18.5 && bmi < 25:
            category = "Normal (healthy weight)";
            break;
        case bmi >= 25 && bmi < 30:
            category = "Overweight";
            break;
        default:
            category = "Obese";
            break;
    }
    return category;
};

// try {
//     const { value1, value2 } = parseArguments(process.argv);
//     const bmiCategory = calculateBmi(value1, value2);
//     console.log(bmiCategory);
// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.'
//     if (error instanceof Error) {
//         errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
// }

// Calling the function with hardcoded parameters and printing the result
// console.log(calculateBmi(180, 74)); // Output: Normal (healthy weight)