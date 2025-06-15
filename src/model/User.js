import { connect } from "../db.js";

export const guardarUsuario = async (discord_id, username, guilds) => {
  const query = `INSERT INTO User_tb(discord_id,username,guilds,time)
    VALUES($1,$2,$3,NOW())RETURNING*;`;

  const values = [discord_id, username, JSON.stringify(guilds)];
  const result = await connect.query(query, values);
  return result.rows[0];
};

export const buscarUsuarioPorId = async (discord_id) => {
  const result = await connect.query(
    "SELECT * FROM User_tb WHERE discord_id = $1 LIMIT 1",
    [discord_id]
  );
  return result.rows[0];
};
