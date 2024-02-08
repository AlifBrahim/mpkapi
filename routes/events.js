var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const bodyParser = require('body-parser');

const pool = mysql.createPool({
  host: 'uumevents-do-user-14295301-0.b.db.ondigitalocean.com',
  port: '25060',
  user: 'doadmin',
  password: 'AVNS_7KPMC3xu3yCp_jz_WfT',
  database: 'mpk'
});

router.use(bodyParser.json());

router.get('/', function(req, res) {
  res.send('Hello, World!');
});
router.post('/signup', async (req, res) => {
  const { userID, password } = req.body;

  if (!userID || !password) {
    return res.status(400).json({ error: 'UserID and password are required' });
  }

  try {
    const query = 'INSERT INTO users (userID, password) VALUES (?, ?)';
    const result = await executeQuery(query, [userID, password]);

    res.status(201).json({ message: 'User created successfully', userID });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function executeQuery(query, params) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
module.exports = router;
