const express = require('express');
const tagsRouter = express.Router();
const { createTag, addTagToGame, removeTagFromGame } = require('../db');

// POST /api/tags 
tagsRouter.post('/', requireAdmin, async (req, res, next) => {
  try {
    const { name } = req.body;
    const tag = await createTag(name);

    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
});

// POST /api/tags/:tagId/games/:gameId 
tagsRouter.post('/:tagId/games/:gameId', requireAdmin, async (req, res, next) => {
  try {
    const { tagId, gameId } = req.params;
    await addTagToGame(gameId, tagId);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// DELETE /api/tags/:tagId/games/:gameId
tagsRouter.delete('/:tagId/games/:gameId', requireAdmin, async (req, res, next) => {
  try {
    const { tagId, gameId } = req.params;
    await removeTagFromGame(gameId, tagId);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = tagsRouter;
