<template>
<div id="posts">
	<v-container>
		<v-row v-for="(post, index) in posts" :key="post.id">
			<v-col>
				<v-card elevation="2" shaped max-width="750" class="mx-auto">
					<v-card-title>{{posts[index].title}}</v-card-title>
					<v-card-subtitle>{{posts[index].poster}} - {{posts[index].date}}</v-card-subtitle>
					<v-card-text>{{posts[index].text}}</v-card-text>
					<v-toolbar dense flat>
						<v-btn icon color="info">
							<v-icon>mdi-arrow-up</v-icon>
						</v-btn>
						<span>{{posts[index].likes}}</span>
						<v-btn icon color="error">
							<v-icon>mdi-arrow-down</v-icon>
						</v-btn>
					</v-toolbar>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Request from "../services/Request";

class Post
{
	private title = "";
	private poster = "";
	private date = "";
	private text = "";
	private likes = 0;

	constructor(title: string, poster: string, date: string, text: string, likes: number)
	{
		this.title = title;
		this.poster = poster;
		this.date = date;
		this.text = text;
		this.likes = likes;
	}
}

@Component
export default class Posts extends Vue
{
	private posts: Post[] = [];

	created()
	{
		this.getPosts();
	}

	private async getPosts()
	{
		try
		{
			const response = await Request.getPosts();

			let i = 0;

			while (response.data.postDocument[i])
			{
				this.posts.push(new Post(response.data.postDocument[i].title, 
										response.data.postDocument[i].poster,
										response.data.postDocument[i].date_of_post,
										response.data.postDocument[i].text,
										response.data.postDocument[i].likes));
				i++;
			}

			console.log(response);
		}
		catch (error)
		{
			// this.showErrorWithMsg(error.response.data.message)
			console.log(error);
		}
	}

	private async makePost()
	{
		try
		{
			const response = await Request.makePost(
			{
				title: "New Title",
				poster: "User",
				text: "Some text!!!",
			});

			console.log(response);
		}
		catch (error)
		{
			// this.showErrorWithMsg(error.response.data.message)
			console.log(error);
		}
	}
}
</script>

<style scoped>
</style>
