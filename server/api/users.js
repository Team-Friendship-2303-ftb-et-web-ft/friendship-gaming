const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { getUserByUsername, createUser, getUser, getUserById, createUserInfo, getUserInfoByUser } = require('../db/users');
const { requireAdmin, requireUser } = require('./utils');
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

//Login
router.post('/login', async(req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({message: 'please supply both a username and password'})
  }

  try {
    const user = await getUser({username, password});

    //will need to add these input values to req.body or add a separate page for collecting userInfo + addresses (but it needs to be created immediately after registration - unless we modify requireAdmin so it doesn't break if userInfo.isAdmin doesn't exist)
    await createUserInfo({userId: user.id, firstName: 'anna', lastName: 'gibes', dateOfBirth: '01/27/1999', isAdmin: true, addressId: null})
    const userInfo = await getUserInfoByUser(user.id)

    if (user) {
      const token = jwt.sign(user, process.env.JWT_SECRET);
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
  try {
        res.send({message:'at /me'});
  } catch (message) {
    res.send(message);
  }
});

//Admin Controls
router.get('/admin', requireAdmin, async(req,res,next) => {
  try {
      res.send({message: "logged in as admin"})
  } catch (message){
    res.send(message);
  }
});

module.exports = router;