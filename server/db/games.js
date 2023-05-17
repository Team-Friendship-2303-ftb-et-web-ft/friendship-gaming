const client = require("./client");

// The createGame function is used to create a new game entry in the database.

async function createGame({ AuthorName, Genre, Title, Price, Description, Tags, Featured }) {
  try {
    // This is inserting the game details into the 'Games' table and returning the newly created game.
    const { rows: [ game ] } = await client.query(`
      INSERT INTO Games(AuthorName, Genre, Title, Price, Description, Featured)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `, [AuthorName, Genre, Title, Price, Description, Featured]);

    // For each tag in the 'Tags' array, it is inserting a new entry into the 'Game_Tags' table, linking the game to a tag.

    // const promises = Tags.map(tag => {
    //   return client.query(`
    //     INSERT INTO game_tags(gameId, tagId)
    //     VALUES ($1, $2);
    //   `, [game.gameID, tag]);
    // });


    // // Waiting for all tag-insertions to complete
    // await Promise.all(promises);
    
    // Returning the newly created game
    return game;
  } catch (error) {
    console.error("Error creating game", error);
    throw error;
  }
}

async function getGameById(id) {
  try {
    const { rows: [ game ] } = await client.query(`
      SELECT * FROM Games
      WHERE GameID=$1;
    `, [id]);

    return game;
  } catch (error) {
    console.error(`Error getting game by id: ${id}`, error);
    throw error;
  }
}

async function getAllGames() {
  try {
    const { rows: games } = await client.query(`
      SELECT * FROM Games;
    `);
   
    return games;
  } catch (error) {
    console.error("Error getting all games", error);
    throw error;
  }
}

async function getGamesByAuthor(AuthorName) {
  try {
    const { rows: games } = await client.query(`
      SELECT * FROM Games
      WHERE AuthorName=$1;
    `, [AuthorName]);

    return games;
  } catch (error) {
    console.error("Error getting games by author", error);
    throw error;
  }
}

async function getGamesByGenre(Genre) {
  try {
    const { rows: games } = await client.query(`
      SELECT * FROM Games
      WHERE Genre=$1;
    `, [Genre]);

    return games;
  } catch (error) {
    console.error("Error getting games by genre", error);
    throw error;
  }
}

async function getGamesByTag(tagId) {
  try {
    const { rows: games } = await client.query(`
      SELECT Games.* FROM Games
      JOIN Game_Tags ON Games.GameID = Game_Tags.gameId
      WHERE Game_Tags.tagId=$1;
    `, [tagId]);

    return games;
  } catch (error) {
    console.error("Error getting games by tag", error);
    throw error;
  }
}

async function updateGame({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    const { rows: [ updatedGame ] } = await client.query(`
      UPDATE Games
      SET ${setString}
      WHERE GameID=$${Object.keys(fields).length + 1}
      RETURNING *;
    `, [...Object.values(fields), id]);

    return updatedGame;
  } catch (error) {
    console.error("Error updating game", error);
    throw error;
  }
}

async function destroyGame(id) {
    try {
    d
      await client.query(`
        DELETE FROM Game_Tags
        WHERE "gameId"=$1;
      `, [id]);
  
      // Delete the game from the Games table
      const { rows: [deletedGame] } = await client.query(`
        DELETE FROM Games
        WHERE GameID=$1
        RETURNING *;
      `, [id]);
  
      // Return the deleted game
      return deletedGame;
    } catch (error) {
      console.error("Error deleting game", error);
      throw error;
    }
  }
  
  module.exports = {
    createGame,
    getGameById,
    getAllGames,
    getGamesByAuthor,
    getGamesByGenre,
    getGamesByTag,
    updateGame,
    destroyGame,
  };
  