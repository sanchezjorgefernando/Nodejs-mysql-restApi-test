import { json } from "express";
import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    //throw newError('DB Error') // forzar error 
    const [rows] = await pool.query("SELECT * FROM categoria");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Algo salio mal...' }) 
  }
};

export const getEmployee = async (req, res) => {
  //console.log(req.params.id);
  try {
    const [rows] = await pool.query("SELECT * FROM categoria WHERE idcategoria = ?", [req.params.id]);
    //console.log(rows);
    if (rows.length <= 0) return res.status(404).json({ message: "Categoria not found" });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message:'Algo salio mal...' })
  }
};

export const createEmployees = async (req, res) => {
  const { nombre, estado } = req.body

  try {
    const [rows] = await pool.query("INSERT INTO categoria(nombre, estado) VALUES (?, ?)", [nombre, estado]);
    //console.log(nombre, estado, rows.insertId)
    res.send({
      id: rows.insertId,
      nombre,
      estado,
    });
  } catch (error) {
    return res.status(500).json({ message:'Algo salio mal...'})
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM categoria WHERE idcategoria = ?', [req.params.id])
    //console.log(result.affectedRows)
    if(result.affectedRows <= 0) return res.status(404).json({ messsage : 'Categoria not found'})
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: 'Algo salio mal...' })
  }
};

export const updateEmpoyee = async (req, res) => {
  const { id } = req.params
  const { nombre, estado } = req.body  

  try {
    const [result] = await pool.query('UPDATE categoria SET nombre = IFNULL(?, nombre), estado = IFNULL(?, estado) WHERE idcategoria = ?', [nombre, estado, id])
    //console.log(result)
    if(result.affectedRows === 0) return res.status(404).json({ messsage : 'Categoria not found'})
    const [rows] = await pool.query('SELECT * FROM categoria WHERE idcategoria = ?', [id])
    res.json(rows[0])
    
  } catch (error) {
    return res.status(500).json({ message:'Algo salio mal...' })
  }
};

