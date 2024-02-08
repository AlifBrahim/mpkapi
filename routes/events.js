import pool from "express";
import router from "./index";

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
