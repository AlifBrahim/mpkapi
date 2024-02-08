var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const pool = mysql.createPool({
  host: 'uumevents-do-user-14295301-0.b.db.ondigitalocean.com',
  port: '25060',
  user: 'doadmin',
  password: 'AVNS_7KPMC3xu3yCp_jz_WfT',
  database: 'defaultdb'
});

router.use(bodyParser.json());

// router.get('/', function(req, res) {
//   res.send('Hello, World!');
// });


router.get('/', async (req, res) => {
  try {
    const events = await getEventsFromDatabase();
    res.json(events);
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/names', async (req, res) => {
  try {
    const events = await getEventNamesFromDatabase();
    res.json(events);
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function getEventsFromDatabase() {
  return new Promise((resolve, reject) => {
    console.log('Attempting to retrieve events from the database...');

    pool.query('SELECT * FROM defaultdb.events', (error, results, fields) => {
      if (error) {
        console.error('Error querying the database:', error);
        reject(error);
      } else {
        console.log('Successfully retrieved events from the database.');
        console.log('Query results:', results);
        resolve(results);
      }
    });
  });
}
function getEventNamesFromDatabase() {
  return new Promise((resolve, reject) => {
    console.log('Attempting to retrieve events from the database...');

    pool.query('SELECT name FROM defaultdb.events', (error, results, fields) => {
      if (error) {
        console.error('Error querying the database:', error);
        reject(error);
      } else {
        console.log('Successfully retrieved event names from the database.');
        console.log('Query results:', results);
        resolve(results);
      }
    });
  });
}

module.exports = router;
