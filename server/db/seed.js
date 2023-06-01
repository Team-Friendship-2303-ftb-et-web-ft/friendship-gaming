const {
  createUser,
  changeAdminStatus,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  deleteUser,
  createUserInfo,
  getUserInfoByUser,
  updateUserInfo,
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
  updateCartItemQty,
  getCartsWithAllInfo,
  getCartItemsByCartId,
  attachTagsToGames
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
          password varchar(255) NOT NULL,
          "isAdmin" BOOLEAN DEFAULT false
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
          inventoryqty INTEGER NOT NULL,
          imageUrl varchar(255)
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
          password: 'bertie99',
          isAdmin: true,
        });
        await createUser({ 
          username: 'sandra', 
          password: '2sandy4me',
          isAdmin: true,
        });
        await createUser({ 
          username: 'glamgal',
          password: 'soglam',
          isAdmin: false,
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
      addressId: 3
    },
    {
      userId: 1,
      firstName: 'Albert',
      lastName: 'Einstein',
      dateOfBirth: '1879-03-14',
      addressId: 1
    },
    {
      userId: 2,
      firstName: 'Sandra',
      lastName: 'Smith',
      dateOfBirth: '1990-07-20',
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
      genre: "Action" ,
      title: "Enchanted Arsenal: The Battle for the Sacred Sword",
      price: 45.00,
      description: "An adventure game set in a magical world where ordinary objects are not as they seem. You, the chosen hero, must vanquish enchanted furniture which has been cursed and turned hostile, using the fragments to forge the Sacred Sword. Your journey will take you through haunted houses, enchanted forests, and mystical dungeons, each challenge pushing your limits." ,
      featured: true ,
      inventoryqty: 1000,
      imageUrl: "/images/Enchanted Arsenal.png",
    },
     {
      authorName: "Nebula Interactive"  ,
      genre: "FPS",
      title: "Zombie Uprising: Mutant Mayhem in Moscow",
      price: 59.99,
      description:  "In this adrenaline-pumping FPS game, you'll experience the terror of a post-apocalyptic Moscow overrun with mutant zombies. Using a blend of strategy and firepower, you must hijack the minds of the undead and use them to battle opposing forces. Discover twisted plotlines, thrilling missions, and deadly weapons as you brave the chilling Russian winter." ,
      featured: true,
      inventoryqty: 1000,
      imageUrl: "/images/Zombie Uprising.png",
    },
     {
      authorName: "Blackout Studios" ,
      genre: "Horror",
      title: "Inferno of the Undead",
      price: 59.99,
      description: "Experience horror like never before in this immersive game set in the treacherous terrain of the lava kingdom. As the last surviving vampire hunter, you must retrieve holy artifacts, fight off ferocious vampires, and traverse deadly environments. With atmospheric visuals and spine-tingling audio, every moment is filled with fear and anticipation.",
      featured: true ,
      inventoryqty: 1000,
      imageUrl: "/images/Inferno of the Undead.png",
    },
     {
      authorName:  "Nexus Interactive",
      genre: "Arcade",
      title: "Robo-World Builder: The Unknown Frontier",
      price: 25.99,
      description:"Step into a futuristic world of unending possibilities, where your creativity is your only limitation. As a pioneering robotic architect, build unknown worlds using advanced tools and technology. Discover unique environments, create intricate structures, and interact with fellow robots in this genre-defining adventure game.",
      featured: false,
      inventoryqty: 1000,
      imageUrl: "/images/Robo-World Builder.png",
    },
     {
      authorName: "Phantasmic Games" ,
      genre: "Action",
      title: "Beyond The Veil" ,
      price: 45.00,
      description: "This horror-adventure game pushes the boundaries of your imagination. You are the last hope of extra-dimensional entities stuck in our reality. Traverse chilling realms, solve mind-bending puzzles, and negotiate with beings beyond comprehension in your quest to restore balance between dimensions.",
      featured: false,
      inventoryqty: 1000,
      imageUrl: "/images/Beyond The Veil.png",
    },
     {
      authorName: "AquaSphere Games" ,
      genre: "Arcade",
      title:  "Oceanic Realms: Divine City Builder" ,
      price: 49.99,
      description:  "Dive into the role of an aquatic deity in this god game. Using your divine powers, create and maintain underwater cities teeming with life. Manage resources, respond to the prayers of your subjects, and contend with rival gods for supremacy in the oceanic realms.",
      featured: false,
      inventoryqty: 1000,
      imageUrl: "/images/Oceanic Realms.png",
    },
     {
      authorName: "MutantMatch Studios" ,
      genre: "FPS",
      title: "Chaos Hearts",
      price: 59.99,
      description: "An action-packed shooting game where danger and unpredictability go hand in hand. In a post-apocalyptic world, you'll encounter mutants with strange and terrifying powers. Utilize a vast array of weapons and tactics to survive, and maybe, reclaim your world.",
      featured: false,
      inventoryqty: 1000,
      imageUrl: "/images/Chaos Hearts.png",
    },
     {
      authorName:  "MythicRealms Interactive",
      genre: "Horror" ,
      title: "Eternal Legends: Lost Kingdom",
      price: 39.99,
      description: 'Embark on an epic adventure in the mystical realm of Eldoria. Unravel ancient secrets, battle mythical creatures, and solve complex puzzles as you search for the legendary Lost Kingdom. With an intricate storyline and immersive gameplay, this game is a tribute to the grandeur of fantasy RPGs.',
      featured: false,
      inventoryqty: 1000,
      imageUrl: "/images/Eternal Legends.png",
    },
     {
      authorName: "MonkeyStrike Studios" ,
      genre: "FPS",
      title: "Ninja Havoc: Shadows of the Tyrant" ,
      price: 54.99,
      description: "This fast-paced FPS challenges you to liberate your world from a tyrant monkey overlord and his ninja army. Utilize your stealth skills, master the art of ninja combat, and devise strategies to overthrow the monkey dictator in a world where shadows are your greatest ally.",
      featured: true,
      inventoryqty: 1000,
      imageUrl: "/images/Ninja Havoc.png",
    },
     {
      authorName:  "SinisterByte Games",
      genre: "Horror",
      title: "Devil's Dominion: Haunting the AI",
      price: 29.99,
      description: "Enter a world where technology and terror intertwine. In this horror game, you play as a cyber-security specialist tasked with hijacking malevolent AIs wreaking havoc across the globe. Uncover dark secrets, decode complex puzzles, and survive in a world where every step could be your last.",
      featured: false,
      inventoryqty: 1000,
      imageUrl: "/images/Devil's Dominion.png",
    },
     {
      authorName:  "LunarFire Entertainment",
      genre: "Action",
      title: "Moonstrike: Space Soldier",
      price: 44.99,
      description:  "Experience the thrill of interstellar combat in this fast-paced FPS game. As an elite space soldier stationed on the Moon, you're humanity's first line of defense against extraterrestrial threats. Master a vast arsenal of futuristic weaponry, employ cunning tactics, and lead your squad through hostile terrains. Engage in high-stakes skirmishes, defend strategic locations, and protect Earth from potential invaders. The future of mankind rests in your hands.",
      featured: false,
      inventoryqty: 1000,
      imageUrl: "/images/fotor-ai-20230516102519.jpg",
    },
     {
      authorName: 'Abyssal Secrets Studio' ,
      genre: "Arcade",
      title: "GooQuest: Depths of the Abyss" ,
      price: 34.99,
      description: "Embark on an adventure into the deepest parts of the Earth in this puzzle-solving game. As an expert spelunker, you'll freeze oozes, navigate intricate cave systems, and solve enigmatic puzzles. Discover ancient civilizations and unearth treasures while you journey towards the center of the Earth.",
      featured: false,
      inventoryqty: 1000,
      imageUrl: "/images/GooQuest Depths of the Abyss.png",
    },
     {
      authorName: "BioTech Nightmares" ,
      genre: "horror",
      title: "Beastech: Unleashed Horrors" ,
      price: 49.99,
      description: "Step into a chilling horror game where you play as an investigative reporter trying to expose the dark deeds of Beastech Labs. Navigate through a complex network of deception and danger as you delve into the twisted world of genetic and robotic experimentation on bears and reptiles. Your courage and cunning are the only things standing between society and a biological disaster.",
      featured: true,
      inventoryqty: 1000,
      imageUrl: "/images/Beastech Unleashed Horrors.png",
    },
     {
      authorName: "BioTech Nightmares",
      genre: "Action",
      title: "Beastech: G's Revenge" ,
      price: 59.99,
      description: "Beastech Part 2: After exposing Beastech labs they shut down but, left some experiments behind that have escaped and are reaking havic. It is up to you and your knew friend Gnome (half bear half robot ) or G for short,to stop them from taking over your city and spreading across the country.",
      featured: false,
      inventoryqty: 1000,
      imageUrl: "/images/Beastech G's Revenge.png"
    },
     {
      authorName: "WitchForge Games" ,
      genre: "Arcade",
      title: "Cauldron's Call: Dungeon Delve",
      price: 39.99,
      description: "Step into a world of magic and danger in this adventure game. As a member of the Witch's Coven, explore treacherous dungeons filled with deadly traps, hostile creatures, and unimaginable treasures. Improve your spellcraft, build your reputation, and outwit your rivals to become the most powerful witch in the land.",
      featured: false,
      inventoryqty: 1000,
      imageUrl: "/images/Cauldron's Call.png",
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
      await createCartItems({
        cartId: 4,
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
    // console.log("this is game one with tags", gameTwo)
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

    // console.log("Calling getUserInfoByUser");
    //   const userInfoByUser = await getUserInfoByUser(1);
    //   console.log("getUserInfoByUser Result:", userInfoByUser);

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

    // console.log("Calling user by username");
    //   const user = await getUserByUsername('albert');
    //   console.log("getUserByUsername Result:", user);

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

    // console.log("Calling GameTags with #scary");
    // const gameTags = await attachTagsToGames(2);
    // console.log("Result:",gameTags);

    // console.log("Calling getCartByOrder");
    // const orderById = await getCartByOrder(1);
    // console.log("Result:", orderById);

    // console.log("Calling getCartByUser");
    // const orderByUser = await getCartByUserId(2);
    // console.log("Result:", orderByUser);

    // console.log("Calling getCartItemsByUser");
    // const cartItemsByOrder = await getCartItemsByOrder(1);
    // console.log("Result:", cartItemsByOrder);

    // console.log("Calling getCartItemsCart");
    // const cartItemsByCart = await getCartItemsByCartId(2);
    // console.log("Result:", cartItemsByCart);

    // console.log("Calling getCartInfo");
    // const getCartInfo = await getCartsWithAllInfo(2);
    // console.log("Result:", getCartInfo);

    // console.log("Calling changeAdminStatus");
    // const adminStatus = await changeAdminStatus({id:1, boolean:false});
    // console.log("Result:", adminStatus);

    console.log("Calling deleteCartItems");
    const deleteOrderItems = await deleteCartItems(3);
    console.log("Result:", deleteOrderItems);

    //   console.log("Calling updateCart");
    //   const updatedCart = await updatePurchaseStatus({id: 1, purchaseStatus: true});
    //   console.log("updateUserInfo Result:", updatedCart);

    // console.log("Calling updateCartItems");
    //   const updatedCartItems = await updateCartItemQty({id: 1, quantity: 8});
    //   console.log("updateCartItems Result:", updatedCartItems);

      //   console.log("Calling getAllCarts");
      // const GetCarts = await getAllCarts();
      // console.log("updateCartItems Result:", GetCarts);

      // console.log("Calling getCartByUser");
      // const cartByUser = await getCartByUserId(2);
      // console.log("Result:", cartByUser);

      // console.log("Calling getGameId");
      // const getGameId = await getGameById(1);
      // console.log("Result:", getGameId);

  } catch (error) {
    console.error("It broke....no work...test fail");
   throw error;
  }
}

// testDB()