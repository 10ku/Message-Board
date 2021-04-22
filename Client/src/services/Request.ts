import axios from "axios";

const myAxios = axios.create(
	{
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

	static getPosts()
	{
		return myAxios.get("posts");
	}

	static makePost(post: object)
	{
		return myAxios.post("posts", post);
	}

	static changeAvatar(avatar: object)
	{
		return myAxios.put("update/avatar", avatar);
	}

	static changeLike(post: object)
	{
		return myAxios.put("posts", post);
	}
}