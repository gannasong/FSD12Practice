import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { iDoctor } from "./types";
import DoctorCell from "./DoctorCell";

interface DoctorRowProps {
  doctor: iDoctor;
  onChange: () => void;
  apiUrl: string;
}

const DoctorRow: React.FC<DoctorRowProps> = ({ doctor, onChange, apiUrl }) => {
  const [editedDoctor, setEditedDoctor] = useState({ ...doctor });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
    onChange();
  };

  const handleDeleteDoctor = (id: number | null) => {
    // DELETE to apiUrl
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // return response text
        return response.text();
      })
      .then((resp) => {
        console.log("Success:", resp);
        onDelete(id);
        onChange();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onDelete = (id: number | null) => {
    console.log("Deleting doctor with id: ", id);
  };

  return (
    <tr key={doctor.id}>
      <td>{doctor.id}</td>
      <DoctorCell
        name="name"
        value={doctor.name}
        isEditing={isEditing}
        onChange={handleChange}
      />
      <DoctorCell
        name="dateOfBirth"
        value={doctor.dateOfBirth}
        isEditing={isEditing}
        onChange={handleChange}
      />
      <td>
        {isEditing ? (
          <Button className="btn-sm" onClick={() => setIsEditing(false)}>
            Save
          </Button>
        ) : (
          <div>
            <Button
              variant="danger"
              className="btn-sm"
              onClick={() => handleDeleteDoctor(doctor.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button className="btn-sm" onClick={() => setIsEditing(true)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default DoctorRow;
