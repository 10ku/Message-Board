<template>
<div id="posts">
	<ErrorAlert :showError="postError.showError" :errorToDisplay="postError.errorToDisplay"/>
	<v-container>
		<v-row v-for="(post, index) in posts" :key="post.id">
			<v-col>
				<v-card elevation="2" shaped max-width="750" class="mx-auto">
					<v-card-title>{{posts[index].title}}</v-card-title>
					<v-card-subtitle>{{posts[index].poster}} - {{posts[index].date}}</v-card-subtitle>
					<v-card-text>{{posts[index].text}}</v-card-text>
					<v-toolbar dense flat>
						<v-btn icon color="info" @click="changeLike(index, UP_VOTE)">
							<v-icon>mdi-arrow-up</v-icon>
						</v-btn>
						<span>{{posts[index].likes}}</span>
						<v-btn icon color="error" @click="changeLike(index, DOWN_VOTE)">
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
import ErrorAlert from "./ErrorAlert.vue"
import Request from "../services/Request";

class Post
{
	public _id = "";
	private title = "";
	private poster = "";
	private date = "";
	private text = "";
	public likes = 0;
	private voters: string[] = []

	constructor(_id: string, title: string, poster: string, date: string, text: string, likes: number, voters: string[])
	{
		this._id = _id;
		this.title = title;
		this.poster = poster;
		this.date = date;
		this.text = text;
		this.likes = likes;
		this.voters = voters;
	}
}

@Component(
{
	components:
	{
		ErrorAlert
	}
})
export default class Posts extends Vue
{
	private readonly UP_VOTE = 1;
	private readonly DOWN_VOTE = -1;

	private posts: Post[] = [];
	private postError = new ErrorAlert();

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
				this.posts.push(new Post(response.data.postDocument[i]._id,
										response.data.postDocument[i].title,
										response.data.postDocument[i].poster,
										response.data.postDocument[i].date_of_post,
										response.data.postDocument[i].text,
										response.data.postDocument[i].likes,
										response.data.postDocument[i].voters));
				i++;
			}

			// console.log(response);
			this.postError.hideError();
		}
		catch (error)
		{
			if (!error.response)
			{
				this.postError.showErrorWithMsg("Could not reach server!")
			}
			else
			{
				this.postError.showErrorWithMsg(error.response.data.message)
			}
		}
	}

	private async changeLike(index: number, voteChoice: number)
	{
		try
		{
			const response = await Request.changeLike(
			{
				_id: this.posts[index]._id,
				voteChoice: voteChoice,
				voter: this.$store.state.UserModule.user,
			},
			{
				headers:
				{
					Authorization: "Bearer " + this.$store.state.UserModule.token
				}
			}
			);

			// console.log(response);
			this.vote(index, voteChoice);
			this.postError.hideError();
		}
		catch (error)
		{
			if (!error.response)
			{
				this.postError.showErrorWithMsg("Could not reach server!");
			}
			else
			{
				this.postError.showErrorWithMsg(error.response.data.message);
			}
		}
	}

	private vote(index: number, voteChoice: number)
	{
		this.posts[index].likes += voteChoice;
	}
}
</script>

<style scoped>
</style>