const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

// Crear tarea api/tasks
router.post(
  "/",
  auth,
  [
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("proyecto", "El proyecto es obligatorio").not().isEmpty()
  ],
  taskController.CreateTask
);

// Obtener las tareas por proyecto
router.get(
    "/",
    auth,
    taskController.GetTasks
  );

// Actualizar tarea
router.put(
    "/:id",
    auth,
    taskController.UpdateTask
  );

// Eliminar una tarea
router.delete(
    "/:id",
    auth,
    taskController.DeleteTask
  );

module.exports = router;
