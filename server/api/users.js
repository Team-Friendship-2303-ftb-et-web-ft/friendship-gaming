const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { getUserByUsername, createUser, getAllUsers, getUser, getUserById, getUserInfoByUser, getAddressById, updateUserInfo, updateUserAddress, getAddressByUsername} = require('../db/users');
const { requireAdmin, requireUser } = require('./utils');
const { getAllGames } = require('../db');
const { JWT_SECRET } = process.env;

// GET: api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    throw error;
  }
});

//Register
router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      throw new Error("User " + user.username + " is already taken")
    }

    const user = await createUser({username, password});
    const token = jwt.sign({ id: user.id, username}, process.env.JWT_SECRET, { expiresIn: "1w" })

    res.send({message: 'You successfully registered', user: user, token: token})
  } catch (message) {
    res.send(message)
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const {firstName, lastName, dateOfBirth, city, street_address, state, postal_code, country} = req.body;

    const user = await getUserById(id);

    //check to see if user exists
    if (!user) {
      throw new Error ("Could not find the user you want to update");
    }

    //check to see if that user has userInfo
    const userInfo = await getUserInfoByUser(id);

    //if theres user info
    if (userInfo) {
      //get the address
      const userAddress = await getAddressById(userInfo.addressId);
      console.log('userAddress', userAddress);
      //if theres an address update address`


      //////////////////
      if (userAddress) {
        await updateUserAddress({id: userAddress.id, city, street_address, state, postal_code, country});
        next();
      } 
      const updatedUserInfo = await updateUserInfo({id: userInfo.id, firstName, lastName, dateOfBirth});



      //check to see if that userInfo has an address
        const newUserAddress = await getAddressById(userInfo.addressId);
        console.log('newUserAddress', newUserAddress);
        console.log('updatedUserInfo', updatedUserInfo);
        const newupdatedUserInfo = updatedUserInfo.newUserAddress;
        console.log('newupdatedUserInfo', newupdatedUserInfo);
        res.send(updatedUserInfo);
      
    
    }
  } catch (error) {
    console.error(error);
  }
})

//Login
router.post('/login', async(req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({message: 'please supply both a username and password'})
  }
  
  try {
    const user = await getUser({username, password});
    const userInfo = await getUserInfoByUser(user.id)
    
    if (user) {
      const token = jwt.sign(user, JWT_SECRET);     
      res.send({message: 'you have been logged in', user, token, userInfo})
    } else {
      next({message: 'username or password is incorrect'})
    }
  } catch (message) {
    res.send(message);
  }
});

router.get('/me', requireUser, async(req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    res.send({message:'at /me', user: user});
  } catch (message) {
    res.send(message);
  }
});

router.get('/admin', requireAdmin, async(req, res, next) => {
  try {
    const users = await getAllUsers();
    const allGames = await getAllGames();

    const getInfo = async (user) => {
      const info = await getUserInfoByUser(user.id);
      const adminDetails = await getUserById(user.id);
      return { ...user, adminDetails, info };
    }

    const promises = users.map(getInfo);

    const usersWithInfo = await Promise.all(promises);

    res.send({message: "logged in as admin", usersWithInfo, allGames})
  } catch (message){
    res.send(message);
  }
});

module.exports = router;