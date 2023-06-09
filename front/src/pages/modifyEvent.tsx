import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const Mutation = gql`
  mutation UpdateEvent(
    $updateEventId: ID!
    $title: String!
    $description: String!
    $date: Date!
    $startHour: Int!
    $endHour: Int!
  ) {
    updateEvent(
      id: $updateEventId
      title: $title
      description: $description
      date: $date
      startHour: $startHour
      endHour: $endHour
    ) {
      id
      title
      description
      date
      startHour
      endHour
    }
  }
`;

const ModifyEvent = () => {
  const [mutationParams, setMutationParams] = useState<{
    id: string;
    description: string;
    title: string;
    date: Date;
    startHour: number;
    endHour: number;
  }>({
    id: "",
    title: "",
    description: "",
    startHour: 0,
    endHour: 0,
    date: new Date(),
  });
  const [modifyEvent] = useMutation(Mutation);

  async function modifyMyEvent(id: string) {
    await modifyEvent({
      variables: {
        updateEventId: id,
        title: mutationParams.title,
        description: mutationParams.description,
        date: mutationParams.date,
        startHour: mutationParams.startHour,
        endHour: mutationParams.endHour,
      },
    });
    alert("Event has been modified");
    setMutationParams({
      id: "",
      title: "",
      description: "",
      startHour: 0,
      endHour: 0,
      date: new Date(),
    });
  }

  return (
    <>
      <title>Modify Events</title>
      <h1>Modify Event</h1>
      <h2>Please insert the event ID and the new values</h2>

      <input
        value={mutationParams.id}
        type="string"
        placeholder="ID of the event.."
        onChange={(e) =>
          setMutationParams({
            ...mutationParams,
            id: e.target.value,
          })
        }
      />

      <input
        value={mutationParams.title}
        type="string"
        placeholder="New title.."
        onChange={(e) =>
          setMutationParams({
            ...mutationParams,
            title: e.target.value,
          })
        }
      />

      <input
        value={mutationParams.description}
        type="string"
        placeholder="New description.."
        onChange={(e) =>
          setMutationParams({
            ...mutationParams,
            description: e.target.value,
          })
        }
      />
      <input
        value={mutationParams.date}
        type="date"
        placeholder="Date.."
        onChange={(e) => {
          const mydate = new Date(e.target.value);
          setMutationParams({
            ...mutationParams,
            date: mydate,
          });
        }}
      ></input>

      <input
        value={mutationParams.startHour}
        type="number"
        placeholder="New start hour.."
        onChange={(e) =>
          setMutationParams({
            ...mutationParams,
            startHour: e.target.valueAsNumber,
          })
        }
      />

      <input
        value={mutationParams.endHour}
        type="text"
        placeholder="New end hour.."
        onChange={(e) =>
          setMutationParams({
            ...mutationParams,
            endHour: e.target.valueAsNumber,
          })
        }
      />

      <button onClick={async () => await modifyMyEvent(mutationParams.id)}>
        Modify
      </button>
    </>
  );
};

export default ModifyEvent;
