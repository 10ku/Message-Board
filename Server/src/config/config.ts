export default class Config
{
	static readonly settings =
	{
		port: process.env.SERVER_PORT || 3000,
		db:
		{
			url: process.env.MDB_URL || "mongodb://localhost:27017/web_example_db",
			userCollection: process.env.MDB_USER_COLLECTION || "web_example_user_collection",
			postCollection: process.env.MDB_POST_COLLECTION || "web_example_post_collection",
			password: process.env.MDB_PASS || "NEEDS_PASS"
		},
		jwt:
		{
			jwtSecret: process.env.JWT_SECRET || "mySecret",
			jwtExpiration: process.env.JWT_EXPIRATION || "7d"
		}
	}
}