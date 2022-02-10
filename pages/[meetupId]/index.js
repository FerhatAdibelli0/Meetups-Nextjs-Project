import MeetupDetailPage from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetail(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupsData.title}</title>
        <meta name="description" content={props.meetupsData.description} />
      </Head>
      <MeetupDetailPage
        id={props.meetupsData.id}
        title={props.meetupsData.title}
        image={props.meetupsData.image}
        address={props.meetupsData.address}
        description={props.meetupsData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://maxpayne35:qGBr7naSXYmEYnw@cluster0.sp51h.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = await client.db();
  const meetups = await db.collection("meetups").find({}, { _id: 1 }).toArray();

  return {
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://maxpayne35:qGBr7naSXYmEYnw@cluster0.sp51h.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = await client.db();
  const meetupCollection = db.collection("meetups");
  const selectedMettup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });

  return {
    props: {
      meetupsData: {
        id: selectedMettup._id.toString(),
        title: selectedMettup.title,
        image: selectedMettup.image,
        address: selectedMettup.address,
        description: selectedMettup.description,
      },
    },
  };
}

export default MeetupDetail;
