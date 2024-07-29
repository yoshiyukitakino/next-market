import mongoose from "mongoose";

const db_string = "mongodb+srv://glenfiddich12years:nack7nack7@cluster0.bk0yi2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async () => {

    try {

        console.log("MongoDB Connecting...");
        await mongoose.connect(db_string);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Not Connected");
        console.log(error);
        //process.exit(1);
    }
}

export default connectDB;