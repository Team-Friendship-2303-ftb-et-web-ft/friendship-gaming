const {
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  deleteUser,
  createUserInfo,
  getUserInfoByUser,
  updateUserInfo,
  attachInfoToUser, 
  attachAddressToUserInfo,
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
  getAllTags,
  getAddressByUsername,
  purchaseGame,
  attachCartItemsToCart,
  deleteCartItems,
  updatePurchaseStatus,
  updateCartItemQty
} = require('./index.js');
const 
  client
 = require('./client');
 const bcrypt = require('bcrypt');
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
          "firstName" varchar(255) NOT NULL,
          "lastName" varchar(255) NOT NULL,
          "dateOfBirth" DATE,
          "isAdmin" BOOLEAN DEFAULT false,
          "addressId" INTEGER REFERENCES addresses(id)
        );
        CREATE TABLE games(
          id SERIAL PRIMARY KEY,
          "authorName" varchar(255) NOT NULL,
          genre varchar(255) NOT NULL,
          title varchar(255) NOT NULL,
          price DECIMAL NOT NULL,
          description  varchar(500) NOT NULL,
          featured BOOLEAN DEFAULT false,
          inventoryqty INTEGER NOT NULL
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
      authorName:  "Lysandra Nightshade",
      genre: "adventure" ,
      title: "Enchanted Arsenal: The Battle for the Sacred Sword",
      price: 45.00,
      description: "A adventure game where you vanquish enchanted furniture to forge the sacred sword." ,
      featured: true ,
      inventoryqty: 1000,
    },
     {
      authorName: "Nebula Interactive"  ,
      genre: "FPS",
      title: "Zombie Uprising: Mutant Mayhem in Moscow",
      price: 59.99,
      description:  "An FPS game where you hijack mutant zombies in Russia." ,
      featured: true,
      inventoryqty: 1000,
    },
     {
      authorName: "Blackout Studios" ,
      genre: "horror",
      title: "Inferno of the Undead",
      price: 59.99,
      description: "An horror game where you retrieve holy artifacts with vampires in the lava kingdom.",
      featured: true ,
      inventoryqty: 1000,
    },
     {
      authorName:  "Nexus Interactive",
      genre: "adventure",
      title: "Robo-World Builder: The Unknown Frontier",
      price: 25.99,
      description:"A adventure game where you build unknown worlds with robots.",
      featured: false,
      inventoryqty: 1000,
    },
     {
      authorName: "Phantasmic Games" ,
      genre: "adventure",
      title: "Beyond The Veil" ,
      price: 45.00,
      description: "An adventure horror game where you save extra-dimensional entities because, I mean, why the hell not.",
      featured: false,
      inventoryqty: 1000,
    },
     {
      authorName: "AquaSphere Games" ,
      genre: "adventure",
      title:  "Oceanic Realms: Divine City Builder" ,
      price: 49.99,
      description:  "A god game where you build underwater cities by gaining god points.",
      featured: false,
      inventoryqty: 1000,
    },
     {
      authorName: "MutantMatch Studios" ,
      genre: "FPS",
      title: "Chaos Hearts",
      price: 59.99,
      description: "A shooting game where you encounter mutants with unpredictable powers.",
      featured: false,
      inventoryqty: 1000,
    },
     {
      authorName:  "MythicRealms Interactive",
      genre: "adventure" ,
      title: "Eternal Legends: Lost Kingdom",
      price: 39.99,
      description: 'In the mystical realm of Eldoria, an ancient prophecy whispers of a hidden Lost Kingdom. As a brave adventurer, you embark on a perilous journey to unravel the secrets of this legendary realm. Armed with a legendary artifact and accompanied by a loyal group of companions, you must navigate treacherous landscapes, battle fearsome creatures, and solve mind-bending puzzles.',
      featured: false,
      inventoryqty: 1000,
    },
     {
      authorName: "MonkeyStrike Studios" ,
      genre: "FPS",
      title: "Ninja Havoc: Shadows of the Tyrant" ,
      price: 54.99,
      description: "A FPS where you fight ninjas to save  the world from a dictator monkey.",
      featured: true,
      inventoryqty: 1000,
    },
     {
      authorName:  "SinisterByte Games",
      genre: "horror",
      title: "Devil's Dominion: Haunting the AI",
      price: 29.99,
      description: "A horror game where you hijack evil AIs as slowly as possible.",
      featured: false,
      inventoryqty: 1000,
    },
     {
      authorName:  "LunarFire Entertainment",
      genre: "FPS",
      title: "Moonstrike: Space Soldier",
      price: 44.99,
      description:  "An FPS where you defeat space people on the Moon.",
      featured: false,
      inventoryqty: 1000,
    },
     {
      authorName: 'Abyssal Secrets Studio' ,
      genre: "adventure",
      title: "GooQuest: Depths of the Abyss" ,
      price: 34.99,
      description: "An adventure game where you freeze oozes and solve puzzles in the darkest caves to reach the center of the earth.",
      featured: false,
      inventoryqty: 1000,
    },
     {
      authorName: "BioTech Nightmares" ,
      genre: "horror",
      title: "Beastech: Unleashed Horrors" ,
      price: 49.99,
      description: "A horror game where you are a reporter trying to expose a lab that does experiments on bears and reptiles. Fusing them with reobotics and AI thechnology in a laboratory.",
      featured: true,
      inventoryqty: 1000,
    },
     {
      authorName: "BioTech Nightmares",
      genre: "horror",
      title: "Beastech: G's Revenge" ,
      price: 59.99,
      description: "Beastech Part 2: After exposing Beastech labs they shut down but, left some experiments behind that have escaped and are reaking havic. It is up to you and your knew friend Gnome (half bear half robot ) or G for short,to stop them from taking over your city and spreading across the country.",
      featured: false,
      inventoryqty: 1000,
    },
     {
      authorName: "WitchForge Games" ,
      genre: "adventure",
      title: "Cauldron's Call: Dungeon Delve",
      price: 39.99,
      description: "An adventure game where you explore dungeons with witches.",
      featured: false,
      inventoryqty: 1000,
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
      purchaseStatus: false
    });
    await createCart({
      userId: 2,
      purchaseStatus: true
    });
    await createCart({
      userId: 3,
      purchaseStatus: true
    });
    await createCart({
      userId: 2,
      purchaseStatus: false
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

async function createInitialTags() {
  try {
    console.log("Starting to create Tags...");

    const scary = await createTag('#scary');
    const adventure = await createTag('#adventure');
    const AI = await createTag('#AI');

    let [gameOne, gameTwo, gameThree] = await getAllGames();

    await addTagToGame(gameOne.id, adventure.id);
    await addTagToGame(gameTwo.id, adventure.id);
    await addTagToGame(gameTwo.id, scary.id);
    await addTagToGame(gameThree.id, scary.id);
    await addTagToGame(gameThree.id, adventure.id);
    await addTagToGame(gameThree.id, AI.id);
    await purchaseGame(gameTwo.id, 8)
    gameTwo = await getGameById(gameTwo.id);
    console.log("this is game one with tags", gameTwo)
    console.log("Finished Creating Tags!");
  } catch (error) {
    console.log("Error creating tags!");
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

//     console.log("Calling getAllUsers");
//       const users = await getAllUsers();
//       console.log("getAllUsers Result:", users);

//     console.log("Calling getUser");
//       const gotuser = await getUser({username: 'albert', password: 'bertie99'})
//       console.log("getUser Result:", gotuser)

//       // why is it creating an object with lowercase key names
//     console.log("Calling createUserInfo");
//       const userInfo = await createUserInfo({userId: 1, firstName: 'albert', lastName: 'bertie', dateOfBirth: '10/22/00', isAdmin: false, addressId: 1})
//       console.log("createUserInfo Result:", userInfo)

//     console.log("Calling getUserInfoByUser");
//       const userInfoByUser = await getUserInfoByUser(1);
//       console.log("getUserInfoByUser Result:", userInfoByUser);

//     console.log("Calling updateUserInfo");
//       const updatedUserInfo = await updateUserInfo({id: 1, lastName: 'albertie'});
//       console.log("updateUserInfo Result:", updatedUserInfo);

//     console.log("Calling getAddressById");
//       const addressById = await getAddressById(1);
//       console.log("getAddressById Result:", addressById);
    
//     console.log("Calling getAddressByUsername");
//       const addressByUser = await getAddressByUsername({username: 'albert'});
//       console.log("getAddressByUsername Result:", addressByUser);
      
//     console.log("Calling getUserById with 1");

//       const albert = await getUserById(1);
//       console.log("getUserById Result:", albert);

//     console.log("Calling getUserByUsername");
//       const userByUsername = await getUserByUsername({username: 'albert'});
//       console.log("getUserByUsername Result:", userByUsername);
      
//  console.log("Calling getUserById with 1");
//     const albert = await getUserById(1);
//     console.log("getUserByID Result:", albert);

//  console.log("Calling user by username");
//     const user = await getUserByUsername('glamgal');
//     console.log("getUserByUsername Result:", user);

//       const Aalbert = await getUserById(1);
//       console.log("getUserById Result:", Aalbert);



//     console.log("Calling user by username");
//       const user = await getUserByUsername('albert');
//       console.log("getUserByUsername Result:", user);

// console.log("Calling attachInfoToUser");
// const infoToUser = await attachInfoToUser(2);
// console.log("Result:", infoToUser);

// console.log("Calling attachAddressToUserInfo");
// const addressToUser = await attachAddressToUserInfo(2);
// console.log("Result:", addressToUser);

//     console.log("Calling getUserById with 2");
//       const albert = await getUserById(2);
//       console.log("getUserByID Result:", albert);

//     console.log("Calling deleteUser");
//       await deleteUser(1);
//       console.log("deleteUser Result:", await getAllUsers());

//     console.log("Calling getAllGames");
//     const games = await getAllGames();

//     console.log("Calling getAllGames");
//     const games = await getAllGames();

//     console.log("Games Result:", games);

//     console.log("Calling getAllCarts");
//     const orders = await getAllCarts();
//     console.log("Result:", orders);

//     console.log("Calling getAllCartItems");
//     const order = await getAllCartItems();
//     console.log("Result:", order);

//     console.log("Calling getAddressById with 1");
//     const address = await getAddressById(1);
//     console.log("getAddressById Result:", address);


//     console.log("Calling getGamesByTagName with #scary");
//     const gamesWithScary = await getGamesByTag("#scary");
//     console.log("Result:",gamesWithScary);

    // console.log("Calling getCartByOrder");
    // const orderById = await getCartByOrder(1);
    // console.log("Result:", orderById);

    // console.log("Calling getCartByUser");
    // const orderByUser = await getCartByUserId(1);
    // console.log("Result:", orderByUser);

    // console.log("Calling getCartItemsByUser");
    // const cartItemsByOrder = await getCartItemsByOrder(1);
    // console.log("Result:", cartItemsByOrder);

    // console.log("Calling attachCartItemsToCart");
    // const cartItemsToCart = await attachCartItemsToCart(2);
    // console.log("Result:", cartItemsToCart);

    // console.log("Calling deleteCartItems");
    // const deleteOrderItems = await deleteCartItems(1);
    // console.log("Result:", await getAllCartItems());

    //   console.log("Calling updateCart");
    //   const updatedCart = await updatePurchaseStatus({id: 1, purchaseStatus: true});
    //   console.log("updateUserInfo Result:", updatedCart);

    // console.log("Calling updateCartItems");
    //   const updatedCartItems = await updateCartItemQty({id: 1, quantity: 8});
    //   console.log("updateCartItems Result:", updatedCartItems);

  } catch (error) {
    console.error("It broke....no work...test fail");
   throw error;
  }
}

// testDB()