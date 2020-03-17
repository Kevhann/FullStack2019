import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
import { Entry } from "../types";
import DiagnosisView from "./DiagnosisView";

const HospitalEntryView: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}
            <Icon size="huge" name="hospital outline"></Icon>
          </Card.Header>
          <Card.Description>{entry.description}</Card.Description>
          <List bulleted>
            {entry.diagnosisCodes?.map(code => {
              return <DiagnosisView key={code} code={code} />;
            })}
          </List>
        </Card.Content>
        <Card.Content extra>
          <Card.Content extra>{entry.specialist}</Card.Content>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default HospitalEntryView;
