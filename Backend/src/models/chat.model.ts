import mongoose, { Document } from "mongoose";

interface IChat extends Document {
	user1: string;
	user2: string;
	lastMessage: string;
}

const chatSchema = new mongoose.Schema(
	{
		user1: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		user2: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		lastMessage: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

const Chat = mongoose.model<IChat>("Chat", chatSchema);
export default Chat;
