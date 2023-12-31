import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected Successfully");
    });

    connection.on("error", (err) => {
      console.log("Db connection has issues" + err);
      process.exit();
    });
  } catch (error: any) {
    console.log(error.messages);
    console.log("Something went wrong");
  }
}
