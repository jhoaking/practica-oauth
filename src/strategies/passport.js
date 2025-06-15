import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from "../config";
import passport from "passport";
import { Strategy } from "passport-discord";
import { users } from "../model/User";

passport.serializeUser((user,done) =>{
    done(null,user.id)
});

passport.deserializeUser(async (id,done) =>{
    const user =  await users.findById(id)
    done(null,user)
});

// configurar la forma de autentucar a luuario
passport.use(
  new Strategy(
    {
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: "/auth/redirect",
      scope: ["identify", "guilds"],
    },
    (access_token, refresh_token, profile, done) => {
      try {
        console.log(profile);

        const guardar = users(profile.id, profile.username, profile.guilds);
        done(null,guardar);
      } catch (error) {
        console.error(error);
        done(error,null);
      }
    }
  )
);
