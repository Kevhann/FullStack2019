import express from "express";
import cors from "cors";
import patientRouter from "./routes/patientRouter";
import diagnosisRouter from "./routes/diagnosisRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnosisRouter);

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
