import { gql, useQuery } from "@apollo/client";

import { useState } from "react";

type Events = {
  events: Array<{
    id: string;
    title: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
  }>;
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

const ListEvents = () => {
  const { data, loading, error } = useQuery<Events>(query, {
    fetchPolicy: "network-only",
  });
  if (loading) return <>Loading</>;
  if (data) {
    console.log("data: ", data.events);
    return (
      <>
        <h2>Following events in order:</h2>
        {data.events.map((ev) => {
          return (
            <>
              <ul key={ev.id}>
                <p>Id:{ev.id}</p>
                <p>Title:{ev.title}</p>
                <p>Description:{ev.description}</p>
                <p>Date:{ev.date}</p>
                <p>StartHour:{ev.startHour}</p>
                <p>EndHour:{ev.endHour}</p>
                <br></br>
              </ul>
            </>
          );
        })}
      </>
    );
  } else {
    return <>Something went wrong</>;
  }
};
export default ListEvents;
