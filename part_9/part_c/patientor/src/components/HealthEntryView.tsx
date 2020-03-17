import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
import { HealthCheckEntry } from "../types";
import { useStateValue } from "../state";
import DiagnosisView from "./DiagnosisView";

const HealthEntryView: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  console.log("diagnoses:", diagnoses);
  const heartIcon = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return <Icon size="huge" name="heartbeat" color="green" />;
      case 1:
        return <Icon size="huge" name="heartbeat" color="yellow" />;
      case 2:
        return <Icon size="huge" name="heartbeat" color="orange" />;
      case 3:
        return <Icon size="huge" name="heartbeat" color="red" />;
      default:
        return 4;
    }
  };

  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {heartIcon()}
            {entry.date}
            <Icon size="huge" name="stethoscope"></Icon>
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

export default HealthEntryView;
