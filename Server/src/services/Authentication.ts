import passport from "passport";

export default class Auth
{
	static authorize(req: any, res: any, next: any)
	{
		passport.authenticate("jwt", { session: false }, (error, user) =>
		{
			if (error || !user)
			{
				res.status(403).json({message: "You are Unauthorized"});
			}
			else
			{
				next();
			}
		})(req, res, next);
	}
}