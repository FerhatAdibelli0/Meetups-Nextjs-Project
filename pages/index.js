import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Head Page</title>
        <meta name="description" content="Excellent meetup places ever here" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}
y

// export async function getServerSideProps(context) {
//   const res = context.res;
//   const req = context.req;

//   return {
//     props: {
//       meetups: DUMMY_ITEMS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://maxpayne35:qGBr7naSXYmEYnw@cluster0.sp51h.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = await client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  console.log(meetups);

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 5,
  };
}

export default HomePage;