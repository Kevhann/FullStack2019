import { Patient, SecurePatient, NewPatient, Entry } from "../types";
import patients from "../../data/patients";
import { toNewPatientEntry, parseString, parseEntry } from "../utils";
import { v4 } from "uuid";

const getAllDiagnoses = (): Patient[] => {
  return patients;
};

const getSecureDiagnoses = (): SecurePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addNewPatient = (data: NewPatient): SecurePatient => {
  const newPatientObject = toNewPatientEntry(data);
  const newEntry = { id: v4(), ...newPatientObject };
  patients.push(newEntry);
  return {
    id: newEntry.id,
    name: newEntry.name,
    dateOfBirth: newEntry.dateOfBirth,
    gender: newEntry.gender,
    occupation: newEntry.occupation,
  };
};

const addEntry = (id: string, data: Entry): Patient => {
  const parsedId = parseString(id);

  const found = patients.find(p => p.id === parsedId);

  if (!found) {
    throw new Error(`patient with id ${parsedId} was not found`);
  }

  const parsedEntry = parseEntry(data);
  const fullEntry = { ...parsedEntry, id: v4() };

  found.entries.push(fullEntry);

  return found;
};

const getById = (id: string): Patient | undefined => {
  const found = patients.find(p => p.id === id);
  console.log("found:", found);
  return found;
};

export default { addEntry, getAllDiagnoses, getSecureDiagnoses, addNewPatient, getById };
