import { connect, connection } from "mongoose";

export default async function connectDatabase() {

  if (connection.readyState == 1) return;

  console.log("Connecting to database...")

  await connect(process.env.MONGO_DATABASE_URI as string).catch(err => {
    if (err) {
      console.log("Error connecting to database")
      return;
    }
    console.log("Connected to database")
  })

}

