const express = require('express');
const tagsRouter = express.Router();
const { createTag, addTagToGame, removeTagFromGame } = require('../db');

// POST /api/tags 
//creates a new tag
tagsRouter.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const tag = await createTag(name);

    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
});

// POST /api/tags/:tagId/games/:gameId 
// Associates a tag with a game. 'tagId' and 'gameId' are URL parameters.
tagsRouter.post('/:tagId/games/:gameId', async (req, res, next) => {
  try {
    const { tagId, gameId } = req.params;
    await addTagToGame(gameId, tagId);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// DELETE /api/tags/:tagId/games/:gameId
//removes tags association with game
tagsRouter.delete('/:tagId/games/:gameId', async (req, res, next) => {
  try {
    const { tagId, gameId } = req.params;
    await removeTagFromGame(gameId, tagId);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = tagsRouter;
