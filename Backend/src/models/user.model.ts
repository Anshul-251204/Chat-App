import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
	email: string;
	password: string;
	name: string;
	avatar?: string;
	isPasswordMatch: (password: string) => boolean;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		index: true,
	},
	password: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
});

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		if (this?.password) {
			this.password = await bcrypt.hash(this.password, 8);
		}
	}
	next();
});

userSchema.methods.isPasswordMatch = async function (password: string) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
