const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { getUserByUsername, createUser, getAllUsers, getUser, getUserById, createUserInfo, getUserInfoByUser, getAddressById, attachAddressToUserInfo, attachInfoToUser } = require('../db/users');
const { requireAdmin, requireUser } = require('./utils');
const { getAllGames } = require('../db');
const { JWT_SECRET } = process.env;
// GET: api/users
router.get('/', async (req, res, next) => {
  try {
    res.send('Hit the users api!');
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

router.patch('/', async (req, res, next) => {
  try {
    // await createUserInfo({userId: user.id, firstName: 'anna', lastName: 'gibes', dateOfBirth: '01/27/1999', isAdmin: true, addressId: null})
    // const userInfo = await getUserInfoByUser(user.id)
    console.log('coming soon')
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
      console.log("secret is", JWT_SECRET)
      const token = jwt.sign(user, JWT_SECRET);     
       console.log("line 53", token)

      res.send({message: 'you have been logged in', user, token, userInfo})
    } else {
      next({message: 'username or password is incorrect'})
    }
  } catch (message) {
    res.send(message);
  }
});

//User Profile
router.get('/me', requireUser, async(req, res, next) => {
  const {id} = req.user;
  
  try {
    const userInfo = await getUserInfoByUser(id)
    const userAddress = await getAddressById(userInfo.addressId)
    
    res.send({message:'at /me', userInfo, userAddress});
  } catch (message) {
    res.send(message);
  }
});

//Admin Controls
router.get('/admin', requireAdmin, async(req, res, next) => {
  try {
    const userInfo = await getUserInfoByUser(req.user.id)
    const userAddress = await getAddressById(userInfo.addressId)
    const allUsers = await getAllUsers();
    const allGames = await getAllGames();

    res.send({message: "logged in as admin", userInfo, userAddress, allUsers, allGames})
  } catch (message){
    res.send(message);
  }
});

//get all users with user info and addresses
// router.get('/admin/users', async (req, res, next) => {
//   try {
//     const users = await getAllUsers();
//     const getInfo = async() => {
//       const usersWithInfo = users.map(async(user)=> {
//         const info = await getUserInfoByUser(user.id)
//         console.log(info)
//       })

//       // return usersWithInfo;
//     }
//     // console.log(usersWithInfo);
//     getInfo();

//     res.status(200).json(users);

//   } catch (error) {
//     next(error);
//   }
// });


router.get('/admin/users', async (req, res, next) => {
  try {
    const users = await getAllUsers();

    const getInfo = async (user) => {
      const info = await getUserInfoByUser(user.id);
      return { ...user, info };
    }

    const promises = users.map(getInfo);

    const usersWithInfo = await Promise.all(promises);

    res.status(200).json(usersWithInfo);

  } catch (error) {
    next(error);
  }
});

module.exports = router;