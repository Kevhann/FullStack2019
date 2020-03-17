/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, NewEntry, Discharge, HealthCheckRating, SickLeave } from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseString = (data: any): string => {
  if (!data || !isString(data)) {
    throw new Error(`Expected string, got ${typeof data} `);
  }
  return data;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (data: any): Gender => {
  if (!data || !isGender(data)) {
    throw new Error(`Expected a valid gender, got ${data} `);
  }
  return data;
};

const assertNever = (data: never): never => {
  console.log("data:", data);
  throw new Error("Unexpected type");
};

const parseDischarge = (data: any): Discharge => {
  const date = parseString(data.date);
  const criteria = parseString(data.criteria);

  return {
    date,
    criteria,
  };
};

const parseHospital = (data: any) => {
  const discharge = parseDischarge(data.discharge);
  return { discharge, type: data.type };
};

const isHealthRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthRating = (data: any): HealthCheckRating => {
  if (!data || !isHealthRating(data)) {
    throw new Error(`Expected a valid gender, got ${data} `);
  }
  return data;
};

const parseHealth = (data: any) => {
  const healthCheckRating = parseHealthRating(data.healthCheckRating);

  return { healthCheckRating, type: data.type };
};

const parseSickLeave = (data: any): SickLeave => {
  const startDate = parseString(data.startDate);
  const endDate = parseString(data.endDate);

  return {
    startDate,
    endDate,
  };
};

const parseOccupation = (data: any) => {
  const employerName = parseString(data.employerName);
  const sickLeave = parseSickLeave(data.sickLeave);

  return { employerName, sickLeave, type: data.type };
};

const parseEntryData = (data: NewEntry) => {
  switch (data.type) {
    case "HealthCheck":
      return parseHealth(data);
    case "Hospital":
      return parseHospital(data);
    case "OccupationalHealthcare":
      return parseOccupation(data);
    default:
      return assertNever(data);
  }
};

export const parseEntry = (data: NewEntry): NewEntry => {
  const description = parseString(data.description);
  const date = parseString(data.date);
  const specialist = parseString(data.specialist);

  const entryData = parseEntryData(data);

  return {
    ...entryData,
    description,
    date,
    specialist,
  };
};

export const toNewPatientEntry = (object: any): NewPatient => {
  const name = parseString(object.name);
  const dateOfBirth = parseString(object.dateOfBirth);
  const ssn = parseString(object.ssn);
  const gender = parseGender(object.gender);
  const occupation = parseString(object.occupation);
  return { name, dateOfBirth, gender, occupation, ssn, entries: [] };
};
