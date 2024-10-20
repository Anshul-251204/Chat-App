import { connect } from "mongoose";

const connectWithDb = async (uri: string) => {
	const { connection } = await connect(uri);
	console.log("MONGO DB CONNECTED ON HOST ::", connection.host);
};

export default connectWithDb;
