const client = require("./client");

// async function createGame({ authorName, genre, title, price, description, tags, featured }) {
//   try {
//     const { rows: [ game ] } = await client.query(`
//       INSERT INTO games(author_title, genre, title, price, description, featured)
//       VALUES ($1, $2, $3, $4, $5, $6)
//       RETURNING *;
//     `, [authorName, genre, title, price, description, featured]);

//     const promises = tags.map(tag => {
//       return client.query(`
//         INSERT INTO game_tags(game_id, tag_id)
//         VALUES ($1, $2);
//       `, [game.gameid, tag]);
//     });

//     await Promise.all(promises);
//     console.log(game);
//     return game;
//   } catch (error) {
//     console.error("Error creating game", error);
//     throw error;
//   }
// }

async function createGame({ authorName, genre, title, price, description, featured }) {
  try {
    const { rows: [ game ] } = await client.query(`
      INSERT INTO games(author_title, genre, title, price, description, featured)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `, [authorName, genre, title, price, description, featured]);

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
      WHERE gameid=$1;
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
      SELECT * FROM games;
    `);

    return games;
  } catch (error) {
    console.error("Error getting all games", error);
    throw error;
  }
}

async function getGamesByAuthor(authorName) {
  try {
    const { rows: games } = await client.query(`
      SELECT * FROM games
      WHERE author_title=$1;
    `, [authorName]);

    return games;
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

    return games;
  } catch (error) {
    console.error("Error getting games by genre", error);
    throw error;
  }
}

async function getGamesByTag(tagId) {
  try {
    const { rows: games } = await client.query(`
      SELECT games.* FROM games
      JOIN game_tags ON games.gameid = game_tags.game_id
      WHERE game_tags.tag_id=$1;
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
      UPDATE games
      SET ${setString}
      WHERE gameid=$${Object.keys(fields).length + 1}
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
    // Delete game tags from the game_tags table
    await client.query(`
      DELETE FROM game_tags
      WHERE game_id=$1;
    `, [id]);

    // Delete the game from the games table
    const { rows: [deletedGame] } = await client.query(`
      DELETE FROM games
      WHERE gameid=$1
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
