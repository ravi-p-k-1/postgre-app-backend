const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) {
      throw error;
    }

    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const data = req.body;

  //checking if email exists
  pool.query(queries.checkEmailExists, [data.email], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length) {
      res.send("email already exists");
    } else {
      pool.query(
        queries.addStudent,
        [data.name, data.email, data.age, data.dob],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(201).send("data inserted successfully");
          return;
        }
      );
    }
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) {
      throw error;
    }

    res.status(200).json(results.rows);
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (!results.rows.length) {
      res.send("student does not exist");
    } else {
      pool.query(queries.removeStudent, [id], (error, results) => {
        if (error) {
          throw error;
        }

        res.send("student deleted successfully");
      });
    }
  });
};

const updateStudent = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (!results.rows.length) {
      res.send("student does not exist");
    } else {
      pool.query(queries.updateStudent, [name, id], (error, results) => {
        if (error) {
          throw error;
        }
        res.send("updated student successfully");
      });
    }
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
