import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());
const PORT = 3001;

app.get("/", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi?", (req, res) => {
  const { weight, height } = req.query;

  try {
    res.send({
      weight,
      height,
      bmi: calculateBmi(Number.parseInt(height), Number.parseInt(weight)),
    });
  } catch (error) {
    res.status(400);
    res.send({ error: "Malformatted numbers" });
  }
});

app.post("/exercises", (req, res) => {
  const body = req.body;
  if (body.target === undefined || body.daily_exercises === undefined) {
    res.status(400);
    res.send({ error: "Parameters missing" });
  }

  try {
    const diced = body.daily_exercises.map((s: string) => {
      const parsed = Number.parseFloat(s);
      if (Number.isNaN(parsed) || parsed < 0) {
        throw new Error("error in training data input");
      }
      return parsed;
    });
    const target = Number.parseFloat(body.target);
    if (Number.isNaN(target) || target < 0) {
      throw new Error("error in target input");
    }
    res.send(calculateExercises(diced, body.target));
  } catch (error) {
    res.status(400);
    res.send({ error: "Malformatted parameters" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
