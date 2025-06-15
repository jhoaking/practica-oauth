import { connect } from "../db.js";

export const users = async (discord_id, username, guilds) => {
  const query = `INSERT INTO User_tb(discord_id,username,guilds,time)
    VALUES($1,$2,$3,NOW())RETURNING * ;`;

  const values = [discord_id, username, guilds];
  const result = await connect.query(query, values);
  return result.rows;
};
