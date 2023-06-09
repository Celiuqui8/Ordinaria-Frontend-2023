import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const Mutation = gql`
  mutation DeleteEvent($deleteEventId: ID!) {
    deleteEvent(id: $deleteEventId) {
      id
      title
      description
      date
      startHour
      endHour
    }
  }
`;

const DeleteEvent = () => {
  const [mutationParams, setMutationParams] = useState<{
    id: string;
  }>({
    id: "",
  });
  const [deleteEvent] = useMutation(Mutation);

  async function deleteMyEvent(id: string) {
    await deleteEvent({
      variables: {
        deleteEventId: id,
      },
    });
    alert("Event is kaput");
    setMutationParams({
      id: "",
    });
  }

  return (
    <>
      <title>Delete Events</title>
      <h1>Delete new event</h1>
      <h2>In order to delete a new event please insert the id</h2>

      <input
        value={mutationParams.id}
        type="string"
        placeholder="Id of the event.."
        onChange={(e) =>
          setMutationParams({
            id: e.target.value,
          })
        }
      ></input>

      <button onClick={async () => await deleteMyEvent(mutationParams.id)}>
        Delete
      </button>
    </>
  );
};

export default DeleteEvent;
