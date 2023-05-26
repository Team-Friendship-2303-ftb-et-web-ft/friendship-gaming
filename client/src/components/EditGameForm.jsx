import React, { useState } from 'react';

const EditGameForm = ({ game, token }) => {
  // const [authorName, setAuthorName] = useState(game.authorName);
  // const [genre, setGenre] = useState(game.genre);
  // const [title, setTitle] = useState(game.title);
  // const [price, setPrice] = useState(game.price);
  // const [description, setDescription] = useState(game.description);
  // const [featured, setFeatured] = useState(game.featured);
  // const [inventoryqty, setInventoryqty] = useState(game.inventoryqty);

  const [authorName, setAuthorName] = useState('game.authorName');
  const [genre, setGenre] = useState('game.genre');
  const [title, setTitle] = useState('game.title');
  const [price, setPrice] = useState('game.price');
  const [description, setDescription] = useState('game.description');
  const [featured, setFeatured] = useState('game.featured');
  const [inventoryqty, setInventoryqty] = useState('game.inventoryqty');

  console.log('game------>', game)
  console.log(token)


  // const updateGame = async (gameId, gameData) => {
  //   try {
  //     const response = await fetch(`/games/${gameId}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify(gameData)
  //     });
  //     const updatedGame = await response.json();
  //     console.log(updatedGame);
  //     return updatedGame;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // const destroyGame = async (gameId) => {
  //   try {
  //     const response = await fetch(`/games/${gameId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //     });
  //     const deletedGame = await response.json();
  //     console.log(deletedGame);
  //     return deletedGame;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const gameData = { authorName, genre, title, price, description, featured, inventoryqty };
      await updateGame(game.id, gameData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await destroyGame(game.id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form id="edit-game-form" onSubmit={handleUpdate}>
      <label>
        Author Name:
        <input type="text" id="authorName-edit" className="input-field" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
      </label>
      <label>
        Genre:
        <input type="text" id="genre-edit" className="input-field" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </label>
      <label>
        Title:
        <input type="text" id="title-edit" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Price:
        <input type="number" id="price-edit" className="input-field" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea id="description-edit" className="textarea-field" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Featured:
        <input type="checkbox" id="featured-edit" className="checkbox-field" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
      </label>
      <label>
        Inventory Quantity:
        <input type="number" id="inventoryqty" className="form-input" value={inventoryqty} onChange={(e) => setInventoryqty(e.target.value)} required />
      </label>
      <div>
        <button type="submit" id="update-game-btn" className="form-btn">Update Game</button>
        <button onClick={handleDelete} id="delete-game-btn" className="form-btn">Delete Game</button>
      </div>
    </form>
  );
}

export default EditGameForm;