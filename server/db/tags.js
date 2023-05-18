const client = require("./client")

async function createTag(name) {
    try {
      const { rows: [ tag ] } = await client.query(`
        INSERT INTO tags(name)
        VALUES ($1)
        RETURNING *;
      `, [name]);
  
      return tag;
    } catch (error) {
      console.error("Error creating tag", error);
      throw error;
    }
  }
  
async function addTagToGame(gameId, tagId) {
    try {
      await client.query(`
        INSERT INTO game_tags("gameId", "tagId")
        VALUES ($1, $2);
      `, [gameId, tagId]);
  
      console.log(`Tag ${tagId} has been successfully added to game ${gameId}.`);
    } catch (error) {
      console.error(`Error adding tag to game: ${error}`);
      throw error;
    }
  }
  
  async function removeTagFromGame(gameId, tagId) {
    try {
      await client.query(`
        DELETE FROM game_tags
        WHERE "gameId"=$1 AND "tagId"=$2;
      `, [gameId, tagId]);
  
      console.log(`Tag ${tagId} has been successfully removed from game ${gameId}.`);
    } catch (error) {
      console.error(`Error removing tag from game: ${error}`);
      throw error;
    }
  }

  module.exports = {
    createTag,
    addTagToGame,
    removeTagFromGame
  };