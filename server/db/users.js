const client = require('./client');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser({username, password, isAdmin}) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
      const { rows: [user] } = await client.query(`
      INSERT INTO users(username, password, "isAdmin")
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username, "isAdmin";
      `, [username, hashedPassword, isAdmin]);
    return user;

  } catch (error) {
    console.error(error);
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT id, username FROM users
    `);

    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (user && passwordsMatch) {
      console.log(`Passwords match for user ${username}`);
      delete user.password;
      // console.log(user)
      return user
    } else {
      console.log(`Passwords do not match for user ${username}`);
      return null;
    }
  } catch (error) {
    console.error(`Error in getUser: ${error}`);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT id, username, "isAdmin" FROM users
      WHERE id=$1
    `, [userId]);
    
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

    return user;
  } catch (error) {
    console.error(error);
  }
}

async function deleteUser(id) {
  try {
    await client.query(`
      ALTER TABLE userInfo
      DROP COLUMN "userId" CASCADE
    `);
    await client.query(`
      ALTER TABLE cart
      DROP COLUMN "userId" CASCADE
  `);
    await client.query(`
      DELETE FROM users
      WHERE users.id=$1
    `, [id]);
  } catch (error) {
    console.error(error);
  }
}

/**********userInfo**********/
async function createUserInfo({userId, firstName, lastName, dateOfBirth, addressId}) {
  const { rows: [userInfo] } = await client.query(`
    INSERT INTO userInfo("userId", "firstName", "lastName", "dateOfBirth", "addressId")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [userId, firstName, lastName, dateOfBirth, addressId]);
  return userInfo;
}

async function getUserInfoByUser(userId) {
  const user = await getUserById(userId);

  const { rows: [userInfo] } = await client.query(`
  SELECT users.id, users.username, userInfo.*
  FROM users
  JOIN userInfo ON users.id = userInfo."userId"
  WHERE users.id = $1
`, [userId]);

  const userAddress = await getAddressByUsername({username: user.username});
  if (userAddress) {
    userInfo.address = userAddress;
  }
  // console.log(userInfo);
  return userInfo;
}

async function updateUserInfo({id, ...fields}) {
  try {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 2}`).join(', ');
    
    const { rows } = await client.query(`
      UPDATE userInfo
      SET ${setString}
      WHERE id=$1
      RETURNING *
    `, [id, ...Object.values(fields)]);

    return rows;
  } catch (error) {
    console.error(error)
  }
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

async function getAddressById(addressId) {
  try {
    const { rows: [address] } = await client.query(`
      SELECT * FROM addresses
      WHERE id = $1
    `, [addressId]);
  
    return address
  } catch (error) {
    console.error(error)
  }
}

async function getAddressByUsername({username}) {
  const user = await getUserByUsername(username);
  const userId = user.id;
  try {
    const address = await getAddressById(userId)
    return address;
  } catch(error) {
    console.error(error)
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  deleteUser,
  createUserInfo,
  getUserInfoByUser,
  updateUserInfo,
  createAddress,
  getAddressById,
  getAddressByUsername
};
