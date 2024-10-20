import mongoose, { Document, ObjectId } from "mongoose";

interface IMessage extends Document {
	sender: string | ObjectId;
	to: string | ObjectId;
	content: string;
	chatId: string | ObjectId;
}

const messageSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		chatId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		content: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
