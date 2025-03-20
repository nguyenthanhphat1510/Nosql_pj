import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://ntp:thanhphat@cluster0.q91pm.mongodb.net/Phone_Laptop?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("DB Connected to NTP"));
};
