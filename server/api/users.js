const router = require('express').Router();
const jwt = require('jsonwebtoken');
// const {requireUser, requireAdmin} = require('./utils');
const { getUserByUsername, createUser, getUser, getUserById } = require('../db/users');
const { requireUser } = require('./utils');
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
    const token = jwt.sign({ id: user.id, username}, process.env.JWT_SECRET, { expiresIn: "1w" })

    res.send({message: 'You successfully registered', user: user, token: token})
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
      const token = jwt.sign(user, process.env.JWT_SECRET);
      console.log('token');
      res.send({message: 'you have been logged in', user, token})
    } else {
      next({message: 'username or password is incorrect'})
    }
  } catch (message) {
    res.send(message);
  }
});


router.get('/me', async(req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  try {
    if(!auth) {
      throw new Error ('You must be logged in to perform this action');
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      const {id} = jwt.verify(token, JWT_SECRET);

      if(id) {
        req.user = await getUserById(id);
        res.send(req.user);
      }
    }
  } catch (message) {
    res.send(message);
  }
});

module.exports = router;
