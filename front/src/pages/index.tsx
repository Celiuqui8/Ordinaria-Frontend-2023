import Head from "next/head";
import Link from "next/link";
import ListEvents from "@/components/ListOfEvents";
export default function Home() {
  return (
    <>
      <Head>
        <title>Examen ordinario Celia</title>
      </Head>
      <div className="container">
        <h1>Events</h1>
        <button className="button"><Link href={`addEvent/`}>Add event</Link></button>
        <button className="button"><Link href={`deleteEvent/`}>Delete event</Link></button>
      </div>

      <div className="listaEventos">
        <ListEvents/>
      </div>
    </>
  )
}
