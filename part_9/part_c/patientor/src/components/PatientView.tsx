import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue, addPatientData } from "../state";
import { Table, Dimmer, Loader, Icon, Label, Button } from "semantic-ui-react";
import EntryView from "./EntryView";
import AddEntryModal from "../AddEntry/AddEntryModal";
import { FormValues } from "../AddEntry/AddEntryForm";

const PatientView: React.FC = () => {
  const { id } = useParams();

  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const patient = Object.values(patients).find(p => p.id === id);

  React.useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        console.log("patien:", patientFromApi);
        dispatch(addPatientData(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patient?.ssn) {
      fetchPatientList();
    }
  }, [dispatch]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = (values: FormValues) => {
    try {
      console.log("values:", values);
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const getGender = () => {
    switch (patient?.gender) {
      case "male":
        return "mars";
      case "female":
        return "venus";
      case "other":
        return "genderless";
      default:
        return "question";
    }
  };

  if (!patient) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  return (
    <>
      <Table celled definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>{patient.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Gender</Table.Cell>
            <Table.Cell>
              <Icon size="big" name={getGender()} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Occupation</Table.Cell>
            <Table.Cell>{patient.occupation}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Ssn</Table.Cell>
            <Table.Cell>{patient.ssn}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Birthday</Table.Cell>
            <Table.Cell>{patient.dateOfBirth}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <AddEntryModal modalOpen={modalOpen} onSubmit={submitNewPatient} error={error} onClose={closeModal} />
      <Button onClick={() => openModal()}>Add New Patient</Button>
      {patient.entries?.length === 0 ? (
        <Label>No entries</Label>
      ) : (
        <Label color="blue" style={{ marginBottom: 15 }}>
          Entries:
        </Label>
      )}
      {patient.entries?.map(e => (
        <EntryView key={`${e.date}${e.description}${e.specialist}`} entry={e} />
      ))}
    </>
  );
};

export default PatientView;
