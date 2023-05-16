const client = require('./client');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser({username, password}) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
      const { rows: [user] } = await client.query(`
      INSERT INTO users(username, password)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username;
      `, [username, hashedPassword]);

      if (!user.length) {
        console.log('could not find user');
        return;
      }

      return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUser({username, password}) {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordsMatch) {
      console.log('passwords do not match');
      return; 
    } else {
      const { rows: [user] } = await client.query(`
      SELECT id, username FROM users
      WHERE username = $1
      `, [username]);

      if (!user.length) {
        console.log('could not find user');
        return;
      }

      return user;
    }
  } catch (error) {
    console.error(error);
  }
}

async function getUserById(userID) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT id, username FROM users
      WHERE id=$1
    `, [userID]);

    if (!user.length) {
      console.log('could not find user');
      return;
    }

    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT * FROM users
      WHERE username=$1
    `, [username]);

    if (!user.length) {
      console.log('could not find user');
      return;
    }

    return user;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
