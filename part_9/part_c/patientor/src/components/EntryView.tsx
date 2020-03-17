import React from "react";
import { Entry } from "../types";
import HealthEntry from "./HealthEntryView";
import OccupationalEntry from "./OccupationalEntryView";
import HospitalEntry from "./HospitalEntryView";

const EntryView: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (entryType: never): never => {
    console.log("entry:", entryType);
    throw new Error(`Got invalid entry type`);
  };

  switch (entry.type) {
    case "HealthCheck":
      return <HealthEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalEntry entry={entry} />;
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryView;
