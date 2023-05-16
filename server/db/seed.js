const {
  client
} = require('./client');


/*******DROP TABLES ********/

const dropTables = async () => {
  try{
    console.log("Dropping tables now!")
    await client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS cartItems;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS userInfo;
    DROP TABLE IF EXISTS games;
    DROP TABLE IF EXISTS addresses;
    `);
    console.log("Tables have been dropped!")
  } catch (error){
    console.error("Well, that didnt work...")
    throw error;
  }
}

/*******CREATE TABLES ********/

const createTables = async () => {
  try {
      console.log("Found my hammer, table on the way!")
      await client.query(`
      CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL
        );
        CREATE TABLE userInfo (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          firstName varchar(255) NOT NULL,
          lastName varchar(255) NOT NULL,
          dateOfBirth DATE
          isAdmin BOOLEAN DEFAULT false,
          "addressId" INTEGER REFERENCES addresses(id)
        );
        CREATE TABLE tags(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL
          );
        CREATE TABLE game_tags(
          "gameId" INTEGER REFERENCES games(id),
          "tagId" INTEGER REFERENCES tags(id),
          UNIQUE ("postId", "tagId")
                  );
        CREATE TABLE games(
          id SERIAL PRIMARY KEY,
          authorName varchar(255) NOT NULL,
          genre varchar(255) NOT NULL,
          title varchar(255) NOT NULL,
          price DECIMAL NOT NULL,
          description  varchar(500) NOT NULL,
          featured BOOLEAN DEFAULT false
        );
        CREATE TABLE addresses(
          id SERIAL PRIMARY KEY,
          street_address varchar(255) NOT NULL,
          city varchar(255) NOT NULL,
          state varchar(255) NOT NULL,
          country varchar(255) NOT NULL,
          postal_code INTEGER 
        );
        CREATE TABLE cart(
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          purchaseStatus BOOLEAN DEFAULT false
          );
        CREATE TABLE cartItems(
            id SERIAL PRIMARY KEY,
            "cartId"  INTEGER REFERENCES cart(id),
            "gameId"  INTEGER REFERENCES games(id),
            quantity INTEGER,
            priceAtPurchase DECIMAL
            );
        `);
      console.log("Tables done. Double tapped for good measure.")
  } catch (error) {
      console.error("Made an error making tables!")
      throw error;
  }
}




/*******CREATE USERS ********/

async function createInitialUsers() {
  try{ 
      console.log("Creating the Users");
      await createUser({ 
          username: 'albert', 
          password: 'bertie99'
        });
        await createUser({ 
          username: 'sandra', 
          password: '2sandy4me'
        });
        await createUser({ 
          username: 'glamgal',
          password: 'soglam'
        });
      console.log("Users are Created!")
  
  } catch(error) {
      console.error("Just kidding nothing happened...");
      throw error;
  }
}

const rebuildDB = async () => {
  try {
      client.connect();

      await dropTables();
      await createTables();
      await createInitialUsers();
      //await createInitialGames();
     // await createInitialTags();
     // await createInitialAddresses();
      
  } catch (error) {
     throw error;
  }
}

/******* TESTS ********/

const testDB = async () => {
  try {
    console.log("Testing, Testing 1,2...?")

    
    const users = await getAllUsers();
    console.log("Result:", users);


  } catch (error) {
    console.error("It broke....no work...test fail");
   throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());