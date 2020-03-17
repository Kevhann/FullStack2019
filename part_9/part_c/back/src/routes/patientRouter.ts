import express from "express";
import patientService from "../services/patientService";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientService.getSecureDiagnoses());
});

patientRouter.get("/:id", (req, res) => {
  console.log("params", req.params.id);

  res.send(patientService.getById(req.params.id));
});

patientRouter.post("/:id/entries", (req, res) => {
  console.log("params", req.params.id);
  console.log("body:", req.body);

  res.send(patientService.addEntry(req.params.id, req.body));
});

patientRouter.post("/", (req, res) => {
  const data = req.body;
  const newPatient = patientService.addNewPatient(data);

  res.send(newPatient);
});

export default patientRouter;
