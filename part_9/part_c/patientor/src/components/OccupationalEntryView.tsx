import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";
import DiagnosisView from "./DiagnosisView";

const OccupationalEntry: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}
            <Icon size="huge" name="briefcase"></Icon>
            {entry.employerName}
          </Card.Header>

          <Card.Description>{entry.description}</Card.Description>
          <List bulleted>
            {entry.diagnosisCodes?.map(code => {
              return <DiagnosisView key={code} code={code} />;
            })}
          </List>
        </Card.Content>
        <Card.Content extra>{entry.specialist}</Card.Content>
      </Card>
    </Card.Group>
  );
};

export default OccupationalEntry;
