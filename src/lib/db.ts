import mongoose from "mongoose";

type isConnectionObject = {
  isConnected: boolean;
};

const connection: isConnectionObject = {
  isConnected: false,
};
export async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = db.connections[0].readyState === 1;
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
