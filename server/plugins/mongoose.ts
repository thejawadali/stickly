
import mongoose from "mongoose";

let db: any;
export default async (_nitroApp: any) => {
  const config = useRuntimeConfig();

  try {
    db = await mongoose.connect(config.mongoUri);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error(e);
  }
};

export { db };
