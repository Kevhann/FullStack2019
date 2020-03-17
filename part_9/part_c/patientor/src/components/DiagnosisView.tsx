import React from "react";
import { List } from "semantic-ui-react";
import { useStateValue } from "../state";

const DiagnosisView: React.FC<{ code: string }> = ({ code }) => {
  const [{ diagnoses }] = useStateValue();

  console.log("code:", code);
  console.log("diagnoses:", diagnoses);

  return (
    <List.Item key={code}>
      {!diagnoses[code] ? (
        <List.Content>{code}</List.Content>
      ) : (
        <List.Content>
          {`${code} : ${diagnoses[code].name}`}
          {diagnoses[code].latin ? <i>{` - ${diagnoses[code].latin}`}</i> : null}
        </List.Content>
      )}
    </List.Item>
  );
};

export default DiagnosisView;
