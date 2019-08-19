import PersonModel from '../models/Person';
import db from '../db';

const Person = {

  async create(req, res) {
    const text = `INSERT INTO
      people(first_name, middle_name, last_name, display_name)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      req.body.first_name,
      req.body.middle_name,
      req.body.last_name,
      req.body.display_name
    ];

    try {
      const {rows} = await db.query(text, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM people';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    }
    catch(error) {
      console.log(process.env.DATABASE_URL);
      return res.status(400).send(error);
    }
  },

  async getOne(req, res) {
    const text = 'SELECT * FROM people WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'person not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  },

  async update(res, req) {
    const findOneQuery = "SELECT * FROM people WHERE id = $1";
    const updateOneQuery = `UPDATE people SET first_name = $1, middle_name
      = $2, last_name = $3, display_name = $4 WHERE id = $5 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'person not found'});
      }
      const values = [
        req.body.first_name || rows[0].first_name,
        req.body.middle_name || rows[0].middle_name,
        req.body.last_name || rows[0].last_name,
        req.params.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err)
    }
  }
}

export default Person;