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
 
  async function attachTagsToGames(games) {
    // Avoid mutation of the original games array.
    const gamesToReturn = [...games];
    
    // Generate placeholders for the query.
    const placeholders = games.map((_, index) => `$${index + 1}`).join(', ');
    const gameIds = games.map((game) => game.gameId);
  
    // Fetch the tags for these games.
    const { rows: tags } = await client.query(`
      SELECT tags.*, game_tags."gameId"
      FROM tags
      JOIN game_tags ON game_tags."tagId" = tags.id
      WHERE game_tags."gameId" IN (${placeholders});
    `, gameIds);
  
    // Attach the tags to the respective games.
    for (const game of gamesToReturn) {
      const tagsForThisGame = tags.filter(
        (tag) => tag.gameId === game.gameId
      );
      game.tags = tagsForThisGame;
    }
  
    return gamesToReturn;
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
  const getAllTags = async () => {
    const { rows } = await client.query(
      `SELECT *
       FROM tags;`
    );
    return rows;
  }
  module.exports = {
    createTag,
    addTagToGame,
    removeTagFromGame,
    getAllTags,
    attachTagsToGames
  };