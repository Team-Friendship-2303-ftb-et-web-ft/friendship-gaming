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

/**********userInfo**********/
async function createUserInfo({userId, firstName, lastName, dateOfBirth, isAdmin, addressId}) {
  const { rows: [userInfo] } = await client.query(`
    INSERT INTO userInfo("userId", firstName, lastName, dateOfBirth, isAdmin, "addressId")
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [userId, firstName, lastName, dateOfBirth, isAdmin, addressId]);
  return userInfo;
}

async function getUserInfoByUser({userID}) {

  const { rows: [userInfo] } = await client.query(`
  SELECT users.*, userInfo.*
  FROM users
  JOIN users ON users.id = userInfo."userID"
  WHERE users.id = $1
`, [userID]);

  if(!userInfo) {
    console.log('could not find userInfo')
    return;
  }

  return userInfo;
}

/*********addresses*********/
async function createAddress({street_address, city, state, country, postal_code}) {
  try {
    const { rows: [address] } = await client.query(`
      INSERT INTO addresses(street_address, city, state, country, postal_code)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [street_address, city, state, country, postal_code]);
    return address;
  } catch (error) {
    console.error(error)
  }
};

async function getAddressByID(addressID) {
  try {
    const { rows: [address] } = await client.query(`
      SELECT * FROM addresses
      WHERE id = $1
    `, [addressID]);
  
    if(!address.length) {
      console.log('could not find address');
      return
    };
  
    return address
  } catch (error) {
    console.error(error)
  }
}

async function getAddressByUser({username}) {
  const user = await getUserByUsername(username);
  const userID = user.id;
  try {
    const { rows: [address] } = await client.query(`
      SELECT addresses.*, userInfo.*
      FROM userInfo
      JOIN addresses ON addresses.id = userInfo."addressId"
      WHERE userInfo."userId"= $1
    `, [userID]);
    return address;
  } catch(error) {
    console.error(error)
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  createUserInfo,
  getUserInfoByUser,
  createAddress,
  getAddressByID,
  getAddressByUser
};
