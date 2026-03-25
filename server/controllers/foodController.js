const { pool } = require('../config/db');

const getFoods = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM food_entries ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении записей:', error.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const addFood = async (req, res) => {
  const { name, calories, proteins, fats, carbs } = req.body;

  if (
    !name ||
    calories === undefined ||
    proteins === undefined ||
    fats === undefined ||
    carbs === undefined
  ) {
    return res.status(400).json({ error: 'Не все поля заполнены' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO food_entries (name, calories, proteins, fats, carbs)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, calories, proteins, fats, carbs]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при добавлении записи:', error.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

module.exports = {
  getFoods,
  addFood
};