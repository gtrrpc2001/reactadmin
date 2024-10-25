import { Draggable, Droppable } from "@hello-pangea/dnd";
import "./patientDroppable.scss";

type Props = {
  patientList: string[];
};

export const PatientDroppable = ({ patientList }: Props) => {
  return (
    <Droppable droppableId="patientList">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="patient-list"
        >
          <h3>환자 리스트</h3>
          {patientList.map((patient, index) => (
            <Draggable key={patient} draggableId={patient} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`patient-item ${
                    snapshot.isDragging ? "dragging" : ""
                  }`}
                >
                  {patient}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
