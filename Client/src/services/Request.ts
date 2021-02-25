import axios from "axios";

const myAxios = axios.create({
	baseURL: "http://localhost:3000"
});

export default class Request
{
	static register(credentials: object)
	{
		return myAxios.post("register", credentials);
	}

	static login(credentials: object)
	{
		return myAxios.post("login", credentials);
	}
}