import axios from "axios";

async function sendRequest() {
	try {
		const res = await axios
			.get("http://localhost:8080")
			.then((res) => console.log("req send", res.data));
	} catch (error) {
		console.log(error);
	}
}

console.time("start");
for (let i = 0; i < 17000; i++) {
	sendRequest();
}
console.timeEnd("start");
