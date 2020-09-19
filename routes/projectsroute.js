const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//Crear proyecto api/projects
router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  projectController.CreateProject
);

router.get("/", auth, projectController.GetProjects);

// Actualizar projecto por el id
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  projectController.UpdateProject
);

// Eliminar un proyecto
router.delete(
  "/:id",
  auth,
  projectController.DeleteProject
);

module.exports = router;
