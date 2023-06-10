import express from 'express';
import { calculateBmi, BmiResponse } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        res.status(400).json({ error: 'malformatted parameters' });
        return;
      }
    const BmiCategory = calculateBmi(height, weight);

    const response: BmiResponse = {
        weight,
        height,
        bmi: BmiCategory,
    };

    res.json(response);
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target} = req.body;
    if (!daily_exercises || !target) {
        res.status(400).json({ error: 'parameters missing' });
        return;
    }
    if (!Array.isArray(daily_exercises) || !daily_exercises.every(Number.isFinite) || !Number.isFinite(target)) {
        res.status(400).json({ error: 'malformatted parameters' });
        return;
    }
    const response: Result = calculateExercises(daily_exercises, target);
    res.json(response);
})

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});