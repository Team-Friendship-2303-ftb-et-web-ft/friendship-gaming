const client = require("./client");
const { attachTagsToGames } = require("./tags")
// The creategame function is used to create a new game entry in the database.

async function createGame({ authorName, genre, title, price, description, featured, inventoryqty }) {
  try {
    const { rows: [ game ] } = await client.query(`
      INSERT INTO games("authorName", genre, title, price, description, featured, inventoryqty)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `, [authorName, genre, title, price, description, featured, inventoryqty]);

    console.log(game);
    return game;
  } catch (error) {
    console.error("Error creating game", error);
    throw error;
  }
}


async function getGameById(id) {
  try {
    const { rows: [ game ] } = await client.query(`
      SELECT * FROM games
      WHERE id=$1;
    `, [id]);

    const games = await attachTagsToGames([game]);
    return games[0];
  } catch (error) {
    console.error(`Error getting game by id: ${id}`, error);
    throw error;
  }
}

async function getAllGames() {
  try {
    const { rows: games } = await client.query(`
      SELECT * FROM games;
    `);
   
    return await attachTagsToGames(games);
  } catch (error) {
    console.error("Error getting all games", error);
    throw error;
  }
}

async function getGamesByAuthor(authorName) {
  try {
    const { rows: games } = await client.query(`
      SELECT * FROM games
      WHERE "authorName"=$1;
    `, [authorName]);

    return await attachTagsToGames(games);
  } catch (error) {
    console.error("Error getting games by author", error);
    throw error;
  }
}

async function getGamesByGenre(genre) {
  try {
    const { rows: games } = await client.query(`
      SELECT * FROM games
      WHERE genre=$1;
    `, [genre]);

    return await attachTagsToGames(games);
  } catch (error) {
    console.error("Error getting games by genre", error);
    throw error;
  }
}

async function getGamesByTag(tagId) {
  try {
    const { rows: games } = await client.query(`
      SELECT games.* FROM games
      JOIN game_Tags ON games."gameId" = game_Tags.gameId
      WHERE game_Tags.tagId=$1;
    `, [tagId]);

    return await attachTagsToGames(games);
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
    const { rows: [ updatedgame ] } = await client.query(`
      UPDATE games
      SET ${setString}
      WHERE "gameId"=$${Object.keys(fields).length + 1}
      RETURNING *;
    `, [...Object.values(fields), id]);

    return updatedgame;
  } catch (error) {
    console.error("Error updating game", error);
    throw error;
  }
}

async function destroyGame(id) {
    try {
      // await client.query(`
      //   ALTER TABLE cartItems
      //   DROP COLUMN IF EXISTS "gameId" CASCADE
      //   WHERE "gameId"=$1
      // `);

      await client.query(`
        DELETE FROM game_Tags
        WHERE "gameId"=$1;
      `, [id]);
  
      // Delete the game from the games table
      const { rows: [deletedgame] } = await client.query(`
        DELETE FROM games
        WHERE id=$1
        RETURNING *;
      `, [id]);
  
      // Return the deleted game
      return deletedgame;
    } catch (error) {
      console.error("Error deleting game", error);
      throw error;
    }
  }
  
  async function purchaseGame(gameId, quantityPurchased) {
    try {
      // Begin transaction
      await client.query('BEGIN');
  
      // Check if enough inventoryqty in stock
      const { rows: [ game ] } = await client.query(`
        SELECT inventoryqty FROM games WHERE id = $1;
      `, [gameId]);
  
      if (game.inventoryqty < quantityPurchased) {
        throw new Error("Not enough inventoryqty in stock");
      }
  
      // Update game inventoryqty
      await client.query(`
        UPDATE games
        SET inventoryqty = inventoryqty - $1
        WHERE id = $2;
      `, [quantityPurchased, gameId]);
  
      // Commit transaction
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(`Error purchasing game with ID ${gameId}`, error);
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
    purchaseGame
  };
  