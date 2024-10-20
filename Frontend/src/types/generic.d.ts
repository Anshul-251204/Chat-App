export type IUser = {
	_id?: string;
	email: string;
	password: string;
	name: string;
};

export type ILoginData = {
	email: string;
	password: string;
};

export type IAxoisResponse = {
	data: any;
	message: any;
	success: boolean;
};

export type IMessage = {
	_id?: string;
	sender: string;
	chatId: string;
	content: string;
	from?: string;
	to?: string;
	createdAt?: string;
	updatedAt?: string;
};

export type IChat = {
	_id: string;
	user1: {
		_id: string;
		email: string;
		name: string;
	};
	user2: {
		_id: string;
		email: string;
		name: string;
	};
	createdAt: Date;
	updatedAt: Date;
	messages?: IMessage[];
};
