import React, { useState } from 'react';
import './Forms.css'

const CreateGameForm = ({ token }) => {
  const [authorName, setAuthorName] = useState('');
  const [genre, setGenre] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [inventoryqty, setInventoryqty] = useState('');

  const createGame = async (gameData) => {
    try {
      const response = await fetch(`api/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(gameData)
      });
      const newGame = await response.json();
      console.log(newGame);
      return newGame;
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const gameData = { authorName, genre, title, price, description, featured, inventoryqty };
      await createGame(gameData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    //wrap with a div (make into a modal?)
    <form id="create-game-form" onSubmit={handleSubmit}>
      <label className="create-game-label">
        Author Name:
        <input type="text" id="authorName" className="input-field create-game-input" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
      </label>
      <label className="create-game-label">
        Genre:
        <input type="text" id="genre" className="input-field create-game-input" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </label>
      <label className="create-game-label">
        Title:
        <input type="text" id="title" className="input-field create-game-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label className="create-game-label">
        Price:
        <input type="number" id="price" className="input-field create-game-input" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </label>
      <label className="create-game-label">
        Description:
        <textarea id="description" className="textarea-field create-game-input" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label className="create-game-label">
        Inventory Quantity:
        <input type="number" id="inventoryqty" className="input-field create-game-input" value={inventoryqty} onChange={(e) => setInventoryqty(e.target.value)} required />
      </label>
      <label className="create-game-label checkbox-field">
        Featured:
        <input type="checkbox" id="featured" className="checkbox-field create-game-input" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
      </label>
      <button id="create-game-button" type="submit">Create Game</button>
    </form>
  )
}

export default CreateGameForm;
