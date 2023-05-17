const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { getUserByUsername, createUser, getUser } = require('../db/users');
const { route } = require('./users');
const { JWT_SECRET } = process.env;

// GET: api/users
router.get('/', async (req, res, next) => {
  try {
    res.send('Hit the users api!');
  } catch (error) {
    throw error;
  }
});

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      throw new Error("User " + user.username + " is already taken")
    }

    const user = await createUser({username, password});

    const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, { expiresIn: "1w" })

    res.send({message: 'You successfully registered', user, token})
  } catch (message) {
    res.send(message)
  }
});

router.post('/login', async(req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({message: 'please supply borth a username and password'})
  }

  try {
    const user = await getUser({username, password});
    if (user) {
      const token = jwt.sign(user, proces.env.JWT_SECRET);
      res.send({message: 'you have been logged in', token, user})
    } else {
      next({message: 'username or password is incorrect'})
    }
  } catch (message) {
    res.send(message);
  }
})

module.exports = router;
