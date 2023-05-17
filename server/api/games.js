const express = require('express');
const gamesRouter = express.Router();
const { createGame, getGameById, getAllGames, getGamesByAuthor, getGamesByGenre, getGamesByTag, updateGame, destroyGame } = require('../db');

// GET /api/games
gamesRouter.get('/', async (req, res, next) => {
  try {
    const games = await getAllGames();

    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
});

// GET /api/games/genre/:genre
gamesRouter.get('/genre/:genre', async (req, res, next) => {
    try {
      const { genre } = req.params;
      const games = await getGamesByGenre(genre);
  
      res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  });
  
// GET /api/games/author/:authorName
gamesRouter.get('/author/:authorName', async (req, res, next) => {
    try {
      const { authorName } = req.params;
      const games = await getGamesByAuthor(authorName);

      res.status(200).json(games);
    } catch (error) {
      next(error);
}
  });

// GET /api/games/tag/:tagId
gamesRouter.get('/tag/:tagId', async (req, res, next) => {
    try {
      const { tagId } = req.params;
      const games = await getGamesByTag(tagId);

      res.status(200).json(games);
    } catch (error) {
      next(error);
}
  });

// POST /api/games
gamesRouter.post('/', async (req, res, next) => {
  try {
    const game = await createGame(req.body);
    res.status(201).json(game);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/games/:gameId
gamesRouter.patch('/:gameId', async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const game = await getGameById(gameId);

    if (!game) {
      return res.status(404).json({ error: 'GameNotFound', message: 'No game found with that id' });
    }

    const updatedGame = await updateGame({ id: gameId, ...req.body });

    res.status(200).json(updatedGame);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/games/:gameId
gamesRouter.delete('/:gameId', async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const game = await getGameById(gameId);

    if (!game) {
      return res.status(404).json({ error: 'GameNotFound', message: 'No game found with that id' });
    }

    const deletedGame = await destroyGame(gameId);

    res.status(200).json(deletedGame);
  } catch (error) {
    next(error);
  }
});

module.exports = gamesRouter;