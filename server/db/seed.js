const {
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  createCart,
  getCartByOrder,
  getCartByUserId,
  createCartItems,
  getAllCartItems,
  getCartItemsByOrder,
  createGame,
  getGameById,
  getAllGames,
  getGamesByAuthor,
  getGamesByGenre,
  getGamesByTag,
  updateGame,
  destroyGame,
  addTagToGame,
  removeTagFromGame,
  createTag,
  createAddress,
  getAddressById,
  getAddressByUser,
  getAllTags,
  createUserInfo
} = require('./index.js');
const 
  client
 = require('./client');

/*******DROP TABLES ********/

const dropTables = async () => {
  try{
    console.log("Dropping tables now!")
    await client.query(`
    DROP TABLE IF EXISTS game_tags;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS cartItems;
    DROP TABLE IF EXISTS games;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS userInfo;
    DROP TABLE IF EXISTS addresses;
    DROP TABLE IF EXISTS users;
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
        CREATE TABLE addresses(
          id SERIAL PRIMARY KEY,
          street_address varchar(255) NOT NULL,
          city varchar(255) NOT NULL,
          state varchar(255) NOT NULL,
          country varchar(255) NOT NULL,
          postal_code INTEGER 
        );
        CREATE TABLE userInfo (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          firstName varchar(255) NOT NULL,
          lastName varchar(255) NOT NULL,
          dateOfBirth DATE,
          "isAdmin" BOOLEAN DEFAULT false,
          "addressId" INTEGER REFERENCES addresses(id)
        );
        CREATE TABLE Games(
          id SERIAL PRIMARY KEY,
          AuthorName varchar(255) NOT NULL,
          Genre varchar(255) NOT NULL,
          Title varchar(255) NOT NULL,
          Price DECIMAL NOT NULL,
          Description  varchar(500) NOT NULL,
          Featured BOOLEAN DEFAULT false
        );
        CREATE TABLE cart(
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "purchaseStatus" BOOLEAN DEFAULT false
          );
        CREATE TABLE cartItems(
            id SERIAL PRIMARY KEY,
            "cartId"  INTEGER REFERENCES cart(id),
            "gameId"  INTEGER REFERENCES games(id),
            quantity INTEGER,
            "priceAtPurchase" DECIMAL
            );
            CREATE TABLE tags(
              id SERIAL PRIMARY KEY,
              name VARCHAR(255) UNIQUE NOT NULL
              );
            CREATE TABLE game_tags(
              "gameId" INTEGER REFERENCES games(id),
              "tagId" INTEGER REFERENCES tags(id),
              UNIQUE ("gameId", "tagId")
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
/*******CREATE INITIAL ADDRESSES ********/
async function createInitialAddresses(){
  console.log("creating initial addresses....")
  const addressesToCreate = [
    {
      street_address: "789 Oak Road",
      city: "Willowbrook",
      state: "Texas",
      country: "United States",
     postal_code: 23456,
    },
    {
      street_address: '456 Elm Avenue',
      city: 'Springdale',
      state: 'California',
      country: 'United States',
      postal_code: 67890,
    },
    {
      street_address: '123 Main Street',
      city: 'Pleasantville',
      state: 'New York',
      country: 'United States',
      postal_code: 12345,
    }
  ]
  const addresses = await Promise.all(
    addressesToCreate.map((address) => createAddress(address))
  )
    console.log("Addresses Created:", addresses)
    console.log("Addresses have been created!")
  }

  /*******CREATE INITIAL USERINFO ********/
async function createInitialUserInfo(){
  console.log("creating initial userInfo....")
  const userInfoToCreate = [
    {
      userId: 3,
      firstName: 'Gloria',
      lastName: 'Gallagher',
      dateOfBirth: '1985-12-10',
      isAdmin: false,
      addressId: 3
    },
    {
      userId: 1,
      firstName: 'Albert',
      lastName: 'Einstein',
      dateOfBirth: '1879-03-14',
      isAdmin: false,
      addressId: 1
    },
    {
      userId: 2,
      firstName: 'Sandra',
      lastName: 'Smith',
      dateOfBirth: '1990-07-20',
      isAdmin: false,
      addressId: 2
    }
  ]
  const usersInfo = await Promise.all(
    userInfoToCreate.map((userInfo) => createUserInfo(userInfo))
  )
    console.log("UserInfo Created:", usersInfo)
    console.log("UserInfo has been created!")
  }

/*******CREATE GAMES ********/
async function createInitialGames(){
  console.log("Creating the Games...")

  const gamesToCreate = [
    {
      AuthorName:  "Lysandra Nightshade",
      Genre: "adventure" ,
      Title: "Enchanted Arsenal: The Battle for the Sacred Sword",
      Price: 45.00,
      Description: "A adventure game where you vanquish enchanted furniture to forge the sacred sword." ,
      Featured: true ,
    },
     {
      AuthorName: "Nebula Interactive"  ,
      Genre: "FPS",
      Title: "Zombie Uprising: Mutant Mayhem in Moscow",
      Price: 59.99,
      Description:  "An FPS game where you hijack mutant zombies in Russia." ,
      Featured: true,
    },
     {
      AuthorName: "Blackout Studios" ,
      Genre: "horror",
      Title: "Inferno of the Undead",
      Price: 59.99,
      Description: "An horror game where you retrieve holy artifacts with vampires in the lava kingdom.",
      Featured: true ,
    },
     {
      AuthorName:  "Nexus Interactive",
      Genre: "adventure",
      Title: "Robo-World Builder: The Unknown Frontier",
      Price: 25.99,
      Description:"A adventure game where you build unknown worlds with robots.",
      Featured: false,
    },
     {
      AuthorName: "Phantasmic Games" ,
      Genre: "adventure",
      Title: "Beyond The Veil" ,
      Price: 45.00,
      Description: "An adventure horror game where you save extra-dimensional entities because, I mean, why the hell not.",
      Featured: false,
    },
     {
      AuthorName: "AquaSphere Games" ,
      Genre: "adventure",
      Title:  "Oceanic Realms: Divine City Builder" ,
      Price: 49.99,
      Description:  "A god game where you build underwater cities by gaining god points.",
      Featured: false,
    },
     {
      AuthorName: "MutantMatch Studios" ,
      Genre: "FPS",
      Title: "Chaos Hearts",
      Price: 59.99,
      Description: "A shooting game where you encounter mutants with unpredictable powers.",
      Featured: false,
    },
     {
      AuthorName:  "MythicRealms Interactive",
      Genre: "adventure" ,
      Title: "Eternal Legends: Lost Kingdom",
      Price: 39.99,
      Description: 'In the mystical realm of Eldoria, an ancient prophecy whispers of a hidden Lost Kingdom. As a brave adventurer, you embark on a perilous journey to unravel the secrets of this legendary realm. Armed with a legendary artifact and accompanied by a loyal group of companions, you must navigate treacherous landscapes, battle fearsome creatures, and solve mind-bending puzzles.',
      Featured: false,
    },
     {
      AuthorName: "MonkeyStrike Studios" ,
      Genre: "FPS",
      Title: "Ninja Havoc: Shadows of the Tyrant" ,
      Price: 54.99,
      Description: "A FPS where you fight ninjas to save  the world from a dictator monkey.",
      Featured: true,
    },
     {
      AuthorName:  "SinisterByte Games",
      Genre: "horror",
      Title: "Devil's Dominion: Haunting the AI",
      Price: 29.99,
      Description: "A horror game where you hijack evil AIs as slowly as possible.",
      Featured: false,
    },
     {
      AuthorName:  "LunarFire Entertainment",
      Genre: "FPS",
      Title: "Moonstrike: Space Soldier",
      Price: 44.99,
      Description:  "An FPS where you defeat space people on the Moon.",
      Featured: false,
    },
     {
      AuthorName: 'Abyssal Secrets Studio' ,
      Genre: "adventure",
      Title: "GooQuest: Depths of the Abyss" ,
      Price: 34.99,
      Description: "An adventure game where you freeze oozes and solve puzzles in the darkest caves to reach the center of the earth.",
      Featured: false,
    },
     {
      AuthorName: "BioTech Nightmares" ,
      Genre: "horror",
      Title: "Beastech: Unleashed Horrors" ,
      Price: 49.99,
      Description: "A horror game where you are a reporter trying to expose a lab that does experiments on bears and reptiles. Fusing them with reobotics and AI thechnology in a laboratory.",
      Featured: true,
    },
     {
      AuthorName: "BioTech Nightmares",
      Genre: "horror",
      Title: "Beastech: G's Revenge" ,
      Price: 59.99,
      Description: "Beastech Part 2: After exposing Beastech labs they shut down but, left some experiments behind that have escaped and are reaking havic. It is up to you and your knew friend Gnome (half bear half robot ) or G for short,to stop them from taking over your city and spreading across the country.",
      Featured: false,
    },
     {
      AuthorName: "WitchForge Games" ,
      Genre: "adventure",
      Title: "Cauldron's Call: Dungeon Delve",
      Price: 39.99,
      Description: "An adventure game where you explore dungeons with witches.",
      Featured: false,
    }
  ]

 const games = await Promise.all(
  gamesToCreate.map((game) => createGame(game))
)
  console.log("Games Created:", games)
  console.log("Games have been created!")
}

/*******CREATE CARTS ********/
async function createInitialCarts() {

  try{
    console.log("Creating Initial Carts");
    await createCart({
      userId: 1,
      purchaseStatus: 'false'
    });
    await createCart({
      userId: 2,
      purchaseStatus: 'true'
    });
    await createCart({
      userId: 3,
      purchaseStatus: 'true'
    });
    await createCart({
      userId: 2,
      purchaseStatus: 'false'
    });
    console.log("Carts have been created!")
}catch (error){
  console.error("Carts not created!");
  throw error;
}
}

/*******CREATE CART ITEMS ********/
async function createInitialCartItems(){

 try{ console.log("Starting the cart items...")
    await createCartItems({
    
        cartId: 1,
        gameId: 1,
        quantity: 2,
        priceAtPurchase:45.00
      });
      await createCartItems({
        cartId: 2,
        gameId: 4,
        quantity: 1 ,
        priceAtPurchase:25.99
     });
      await createCartItems({
        cartId: 2,
        gameId: 6,
        quantity: 1,
        priceAtPurchase:49.99
      });
   
    console.log("Finished creating Cart Items!")
  } catch(error){
    console.error("Cart Items not created!");
    throw error;
  }
}

/******* Create Tags ********/

async function createInitialTags(){
  try{
    console.log("Starting to create Tags...");
    const [scary, adventure, AI] = await createTag([
      '#scary',
      '#adventure',
      '#AI'
    ]);

    const [gameOne, gameTwo, gameThree] = await getAllGames();
    await addTagToGame(gameOne.id, [adventure]);
    await addTagToGame(gameTwo.id, [adventure, scary]);
    await addTagToGame(gameThree.id, [scary, adventure, AI]);
    
    console.log("Finished Creating Tags!");
  } catch (error) {
    console.log("error creating tags!")
    throw error;
  }
}

const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialAddresses();
    await createInitialUserInfo();
    await createInitialGames();
    await createInitialCarts(); 
    await createInitialCartItems();
    await createInitialTags();
    
   await testDB();
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    await client.end();
    console.log("Database has been rebuilt, and you're good to go!");
  }
};

rebuildDB();
/******* TESTS ********/



const testDB = async () => {
  try {
    console.log("Testing, Testing 1,2...?")

    //as they pass I am commenting them out to keep the terminal kinda clear




    // const users = await getAllUsers();
    // conslog("Result:", users);ole.

//  console.log("Calling getUserById with 1");
//     const albert = await getUserById(1);
//     console.log("getUserByID Result:", albert);

//  console.log("Calling user by username");
//     const user = await getUserByUsername('glamgal');
//     console.log("getUserByUsername Result:", user);

    // console.log("Calling getAllGames");
    // const games = await getAllGames();
    // console.log("Games Result:", games);

    // console.log("Calling getAllCarts");
    // const orders = await getAllCarts();
    // console.log("Result:", orders);

    // console.log("Calling getAllCartItems");
    // const order = await getAllCartItems();
    // console.log("Result:", order);

    console.log("Calling getAddressById with 1");
    const address = await getAddressById(1);
    console.log("getAddressById Result:", address);


    // console.log("Calling getGamesByTagName with #scary");
    // const gamesWithScary = await getGamesByTag("#scary");
    // console.log("Result:",gamesWithScary);


  } catch (error) {
    console.error("It broke....no work...test fail");
   throw error;
  }
}

