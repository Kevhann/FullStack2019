import express from "express";
import diagnoses from "../../data/diagnoses";

const diagnosisRouter = express.Router();

diagnosisRouter.get("/", (_req, res) => {
  res.send(diagnoses);
});

diagnosisRouter.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default diagnosisRouter;
