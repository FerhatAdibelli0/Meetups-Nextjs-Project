import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

function NewMeetupPage() {
  const router = useRouter();

  async function newMeetupHandler(newMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(newMeetupData),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>New meetup Page</title>
        <meta name="description" content="perfect new meetups here" />
      </Head>
      <NewMeetupForm onAddMeetup={newMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
