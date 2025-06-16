import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from "../config.js";
import passport from "passport";
import { Strategy } from "passport-discord";
import {
  buscarUsuarioPorId,
  controlUsuario,
  guardarUsuario,
} from "../model/User.js";

passport.serializeUser((user, done) => {
  done(null, user.discord_id);
});

passport.deserializeUser(async (id, done) => {
  const user = await buscarUsuarioPorId(id);
  done(null, user);
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
    async (access_token, refresh_token, profile, done) => {
      try {
        const usuarioExistente = await controlUsuario(profile.id);
        if (usuarioExistente) {
          return done(null, usuarioExistente);
        }

        const guardar = await guardarUsuario(
          profile.id,
          profile.username,
          profile.guilds
        );
        done(null, guardar);
      } catch (error) {
        console.error(error);
        done(error, null);
      }
    }
  )
);
