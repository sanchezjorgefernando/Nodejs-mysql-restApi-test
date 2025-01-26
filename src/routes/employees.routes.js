import { Router } from "express";
import { getEmployees, createEmployees, updateEmpoyee, deleteEmployees, getEmployee } from "../controllers/employees.controllers.js";

const router = Router();

router.get("/employees", getEmployees);

router.get("/employees/:id", getEmployee);

router.post("/employees", createEmployees);

router.patch("/employees/:id", updateEmpoyee); //actualizacion parciol
//router.put("/employees/:id", updateEmpoyee); //actualizacion total

router.delete("/employees/:id", deleteEmployees);

export default router;
