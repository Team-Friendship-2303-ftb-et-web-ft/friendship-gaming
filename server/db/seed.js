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
    getAddressByID,
    getAddressByUser
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
        CREATE TABLE games(
          id SERIAL PRIMARY KEY,
          authorName varchar(255) NOT NULL,
          genre varchar(255) NOT NULL,
          title varchar(255) NOT NULL,
          price DECIMAL NOT NULL,
          description  varchar(500) NOT NULL,
          featured BOOLEAN DEFAULT false
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
    },
     {
      authorName: "Nebula Interactive"  ,
      genre: "FPS",
      title: "Zombie Uprising: Mutant Mayhem in Moscow",
      price: 59.99,
      description:  "An FPS game where you hijack mutant zombies in Russia." ,
      featured: true,
    },
     {
      authorName: "Blackout Studios" ,
      genre: "horror",
      title: "Inferno of the Undead",
      price: 59.99,
      description: "An horror game where you retrieve holy artifacts with vampires in the lava kingdom.",
      featured: true ,
    },
     {
      authorName:  "Nexus Interactive",
      genre: "adventure",
      title: "Robo-World Builder: The Unknown Frontier",
      price: 25.99,
      description:"A adventure game where you build unknown worlds with robots.",
      featured: false,
    },
     {
      authorName: "Phantasmic Games" ,
      genre: "adventure",
      title: "Beyond The Veil" ,
      price: 45.00,
      description: "An adventure horror game where you save extra-dimensional entities because, I mean, why the hell not.",
      featured: false,
    },
     {
      authorName: "AquaSphere Games" ,
      genre: "adventure",
      title:  "Oceanic Realms: Divine City Builder" ,
      price: 49.99,
      description:  "A god game where you build underwater cities by gaining god points.",
      featured: false,
    },
     {
      authorName: "MutantMatch Studios" ,
      genre: "FPS",
      title: "Chaos Hearts",
      price: 59.99,
      description: "A shooting game where you encounter mutants with unpredictable powers.",
      featured: false,
    },
     {
      authorName:  "MythicRealms Interactive",
      genre: "adventure" ,
      title: "Eternal Legends: Lost Kingdom",
      price: 39.99,
      description: 'In the mystical realm of Eldoria, an ancient prophecy whispers of a hidden Lost Kingdom. As a brave adventurer, you embark on a perilous journey to unravel the secrets of this legendary realm. Armed with a legendary artifact and accompanied by a loyal group of companions, you must navigate treacherous landscapes, battle fearsome creatures, and solve mind-bending puzzles.',
      featured: false,
    },
     {
      authorName: "MonkeyStrike Studios" ,
      genre: "FPS",
      title: "Ninja Havoc: Shadows of the Tyrant" ,
      price: 54.99,
      description: "A FPS where you fight ninjas to save  the world from a dictator monkey.",
      featured: true,
    },
     {
      authorName:  "SinisterByte Games",
      genre: "horror",
      title: "Devil's Dominion: Haunting the AI",
      price: 29.99,
      description: "A horror game where you hijack evil AIs as slowly as possible.",
      featured: false,
    },
     {
      authorName:  "LunarFire Entertainment",
      genre: "FPS",
      title: "Moonstrike: Space Soldier",
      price: 44.99,
      description:  "An FPS where you defeat space people on the Moon.",
      featured: false,
    },
     {
      authorName: 'Abyssal Secrets Studio' ,
      genre: "adventure",
      title: "GooQuest: Depths of the Abyss" ,
      price: 34.99,
      description: "An adventure game where you freeze oozes and solve puzzles in the darkest caves to reach the center of the earth.",
      featured: false,
    },
     {
      authorName: "BioTech Nightmares" ,
      genre: "horror",
      title: "Beastech: Unleashed Horrors" ,
      price: 49.99,
      description: "A horror game where you are a reporter trying to expose a lab that does experiments on bears and reptiles. Fusing them with reobotics and AI thechnology in a laboratory.",
      featured: true,
    },
     {
      authorName: "BioTech Nightmares",
      genre: "horror",
      title: "Beastech: G's Revenge" ,
      price: 59.99,
      description: "Beastech Part 2: After exposing Beastech labs they shut down but, left some experiments behind that have escaped and are reaking havic. It is up to you and your knew friend Gnome (half bear half robot ) or G for short,to stop them from taking over your city and spreading across the country.",
      featured: false,
    },
     {
      authorName: "WitchForge Games" ,
      genre: "adventure",
      title: "Cauldron's Call: Dungeon Delve",
      price: 39.99,
      description: "An adventure game where you explore dungeons with witches.",
      featured: false,
    }
  ]
 const games = Promise.all(
  gamesToCreate.map((game) => createGame(game))
)
  console.log("Games Created:", games)
  console.log("Games have been created!")
}

/*******CREATE CARTS ********/
async function createInitialCarts() {

    console.log("Creating Initial Carts");
    const cartsToCreate = [
    {
      userId: 1,
      purchaseStatus: false,
    },
    {
      userId: 2,
      purchaseStatus: true,
    },
    {
      userId: 3,
      purchaseStatus: true,
    },
    {
      userId: 2,
      purchaseStatus: false,
    },
  ]
  const carts = Promise.all(
    cartsToCreate.map((cart) => createCart(cart))
  )
    console.log("Carts Created:", carts)
    console.log("Carts have been created!")

}

/*******CREATE CART ITEMS ********/
async function createInitialCartItems(){
  console.log("Starting the cart items...")
    const [] = await getAllCartsWithoutItems();
    const [] = await getAllUsers();

    const cartItemsToCreate =[
      {
        cartId: 1,
        gameId: 1,
        quantity: 2,
        priceAtPurchase:45.00
      },
      {
        cartId: 2,
        gameId: 4,
        quantity: 1 ,
        priceAtPurchase:25.99
      },
      {
        cartId: 2,
        gameId: 6,
        quantity: 1,
        priceAtPurchase:49.99
      },
      {
        cartId: 3,
        gameId: 7,
        quantity:1 ,
        priceAtPurchase:59.99
      },
      {
        cartId: 1,
        gameId: 8,
        quantity:3 ,
        priceAtPurchase:54.99
      },
      {
        cartId: 2,
        gameId: 12,
        quantity: 2,
        priceAtPurchase:34.99
      },
      {
        cartId: 2,
        gameId: 14,
        quantity:2 ,
        priceAtPurchase:59.99
      }
    ]
    const cartItems = await Promise.all(
      cartItemsToCreate.map(addCartItemToCart)
    )
    console.log("Cart items created:", cartItems)
    console.log("Finished creating Cart Items!")
}

/******* Create Tags ********/

async function createInitialTags(){
  try{
    console.log("Starting to create Tags...");
    const[] = await createInitialTags([
      //tags here
    ]);

    const [gameOne, gameFive, gameTen] = await getAllGames();
    await addTagsToGame(gameOne.id, []);
    await addTagsToGame(gameFive.id, []);
    await addTagsToGame(gameTen.id, []);
    
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
    await createInitialCarts();
    await createInitialGames();
    await createInitialCartItems();
    await createInitialTags();
  //  await createInitialAddresses();
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

    
    const users = await getAllUsers();
    console.log("Result:", users);

    console.log("Calling updateUser on users[0]")
    const updateUserResult = await updateUser(users[0].id, {
      name: "Newname Sogood"
    });
    console.log("Result:", updateUserResult);

 console.log("Calling getUserById with 1");
    const albert = await getUserById(1);
    console.log("Result:", albert);

    console.log("Calling getAllGames");
    const games = await getAllGames();
    console.log("Result:", games);

    console.log("Calling getAllCarts");
    const carts = await getAllCarts();
    console.log("Result:", carts);

    console.log("Calling getCartsByUser on ");
    const postsWithHappy = await getPostsByTagName("#happy");
    console.log("Result:", postsWithHappy);

    console.log("Calling getAllCartItems");
    const cartItems = await getAllCartItems();
    console.log("Result:", cartItems);


    console.log("Calling getGamesByTagName with #scary");
    const gamesWithScary = await getGamesByTagName("#scary");
    console.log("Result:",gamesWithScary);


  } catch (error) {
    console.error("It broke....no work...test fail");
   throw error;
  }
}

