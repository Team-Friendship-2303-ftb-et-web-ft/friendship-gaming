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
    console.log(user)
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

      if (user.length == 0) {
        console.log('could not find user');
        return;
      }

      return user;
    }
  } catch (error) {
    console.error(error);
  }
}

async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT id, username FROM users
      WHERE id=$1
    `, [userId]);

    if (user.length == 0) {
      console.log('could not find user');
      return;
    }
    
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUserByUsername({username}) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT id, username FROM users
      WHERE username=$1
    `, [username]);

    // if (user.length == 0) {
    //   console.log('could not find user');
    //   return;
    // }

    return user;
  } catch (error) {
    console.error(error);
  }
}

/**********userInfo**********/
//addressId violates foreign key constraint (the values in a column (or a group of columns) must match the values appearing in some row of another table)
//resource: https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK
async function createUserInfo({userId, firstName, lastName, dateOfBirth, isAdmin}) {
  const { rows: [userInfo] } = await client.query(`

    INSERT INTO userInfo("userId", firstName, lastName, dateOfBirth, "isAdmin", "addressId")
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [userId, firstName, lastName, dateOfBirth, isAdmin, addressId]);
  return userInfo;
}

async function getUserInfoByUser(userId) {

  const { rows: [userInfo] } = await client.query(`
  SELECT users.id, userInfo.*
  FROM users
  JOIN userInfo ON users.id = userInfo."userId"
  WHERE users.id = $1
`, [userId]);

  if(userInfo.length == 0) {
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

async function getAddressById(addressId) {
  try {
    const { rows: [address] } = await client.query(`
      SELECT * FROM addresses
      WHERE id = $1
    `, [addressId]);
  
    if(address.length === 0) {
      console.log('could not find address');
      return
    };
  
    return address
  } catch (error) {
    console.error(error)
  }
}

async function getAddressByUsername({username}) {
  const user = await getUserByUsername({username});
  console.log(user);
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
  createUserInfo,
  getUserInfoByUser,
  createAddress,
  getAddressById,
  getAddressByUser,
  getAddressByUsername

};
