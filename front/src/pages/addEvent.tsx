import { gql, useMutation, useQuery } from "@apollo/client";

import { useState, useEffect } from "react";

type Events = {
  createEvent: {
    id: string;
    title: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
  };
};
const query = gql`
  query Query {
    events {
      id
      title
      description
      date
      startHour
      endHour
    }
  }
`;

const Mutation = gql`
  mutation Mutation(
    $title: String!
    $description: String!
    $startHour: Int!
    $endHour: Int!
    $date: Date!
  ) {
    createEvent(
      title: $title
      description: $description
      startHour: $startHour
      endHour: $endHour
      date: $date
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

const AddEvent = () => {
  const [createEvent, setcreateEvent] = useMutation<Event>(Mutation);
  const [mutationParams, setMutationParams] = useState<{
    title: string;
    description: string;
    startHour: number;
    endHour: number;
    date: Date;
  }>({
    title: "",
    description: "",
    startHour: 0,
    endHour: 0,
    date: new Date(),
  });
  async function addNewEvent() {
    try {
      await createEvent({
        variables: {
          title: mutationParams.title,
          description: mutationParams.description,
          startHour: mutationParams.startHour,
          endHour: mutationParams.endHour,
          date: mutationParams.date,
        },
      });
      window.alert("You have created a new event");
      setMutationParams({
        title: "",
        description: "",
        startHour: 0,
        endHour: 0,
        date: new Date(),
      });
    } catch {
      <>Error</>;
    }
  }

  return (
    <>
      <title>Add Events</title>
      <h1>Add new event</h1>
      <h2>
        In order to add a new event please insert the title, description, start
        hour, end hour in that order
      </h2>

      <input
        value={mutationParams.title}
        type="string"
        placeholder="Title.."
        onChange={(e) =>
          setMutationParams({
            title: e.target.value,
            description: mutationParams.description,
            startHour: mutationParams.startHour,
            endHour: mutationParams.endHour,
            date: mutationParams.date,
          })
        }
      ></input>
      <input
        value={mutationParams.description}
        type="string"
        placeholder="Description.."
        onChange={(e) =>
          setMutationParams({
            title: mutationParams.title,
            description: e.target.value,
            startHour: mutationParams.startHour,
            endHour: mutationParams.endHour,
            date: mutationParams.date,
          })
        }
      ></input>
      <input
        value={mutationParams.startHour}
        type="number"
        placeholder="startHour.."
        onChange={(e) =>
          setMutationParams({
            title: mutationParams.title,
            description: mutationParams.description,
            startHour: e.target.valueAsNumber,
            endHour: mutationParams.endHour,
            date: mutationParams.date,
          })
        }
      ></input>
      <input
        value={mutationParams.endHour}
        type="number"
        placeholder="End Hour.."
        onChange={(e) =>
          setMutationParams({
            title: mutationParams.title,
            description: mutationParams.description,
            startHour: mutationParams.startHour,
            endHour: e.target.valueAsNumber,
            date: mutationParams.date,
          })
        }
      ></input>
      <input
        type="date"
        placeholder="Date.."
        onChange={(e) => {
          const mydate = new Date(e.target.value);
          setMutationParams({
            title: mutationParams.title,
            description: mutationParams.description,
            startHour: mutationParams.startHour,
            endHour: mutationParams.endHour,
            date: mydate,
          });
        }}
      ></input>
      <button onClick={async () => await addNewEvent()}>Add</button>
    </>
  );
};
export default AddEvent;
