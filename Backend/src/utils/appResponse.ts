class ApiResponse {
	message: string;
	data: any;
	constructor(data: any, message: string) {
		this.data = data;
		this.message = message;
	}
}

export default ApiResponse;
