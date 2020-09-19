const Task = require("../models/Task");
const Project = require("../models/Project");
const { validationResult } = require("express-validator");
const router = require("../routes/usersroute");

// Crea una nueva tarea
exports.CreateTask = async (req, resp) => {
  try {
    // Validar el resultado de la validacion de campos
    const validationList = validationResult(req);

    if (!validationList.isEmpty()) {
      return resp.status(400).json({ error: validationList.array() });
    }

    // Extraer el proyecto y comprobar si existe
    // req.query por que desde el front end lo enviamos como params
    const { proyecto } = req.body;

    const project = await Project.findById(proyecto);

    if (!project) {
      return resp.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Validar si el proyecto pertenece al usuario autenticado
    if (project.creador.toString() !== req.user.id) {
      return resp.status(401).json({ msg: "No autorizado" });
    }

    // Crear tarea
    const task = new Task(req.body);
    await task.save();
    resp.json({ task });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ msg: "Hubo un error" });
  }
};

// Obtener tareas por proyecto
exports.GetTasks = async (req, resp) => {
  try {
    // Extraer el proyecto y comprobar si existe
    // req.query por que desde el front end lo enviamos como params
    const { proyecto } = req.query;
    const project = await Project.findById(proyecto);

    if (!project) {
      return resp.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Validar si el proyecto pertenece al usuario autenticado
    if (project.creador.toString() !== req.user.id) {
      return resp.status(401).json({ msg: "No autorizado" });
    }

    // Obtener tareas por proyectos
    const tasks = await Task.find({ proyecto }).sort({ creador: -1});
    resp.json({ tasks });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ msg: "Hubo un error" });
  }
};

exports.UpdateTask = async (req, resp) => {
  try {
    // Extraer el proyecto y comprobar si existe
    const { proyecto, nombre, estado } = req.body;

    const project = await Project.findById(proyecto);

    // Validar si existe la tarea
    let task = await Task.findById(req.params.id);

    if (!task) {
      return resp.status(404).json({ msg: "Tarea no encontrada" });
    }

    // Validar si el proyecto pertenece al usuario autenticado
    if (project.creador.toString() !== req.user.id) {
      return resp.status(401).json({ msg: "No autorizado" });
    }

    // Crear un objeto con la nueva informacion
    const newTask = {};

      newTask.nombre = nombre;
      newTask.estado = estado;

    // Actualizamos la tarea
    task = await Task.findByIdAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });
    resp.json({ task });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ msg: "Hubo un error" });
  }
};

// Eliminar tarea
exports.DeleteTask = async (req, resp) => {
  try {
       // req.query por que desde el front end lo enviamos como params
       const { proyecto } = req.query;

    const project = await Project.findById(proyecto);

    // Validar si existe la tarea
    let task = await Task.findById(req.params.id);

    if (!task) {
      return resp.status(404).json({ msg: "Tarea no encontrada" });
    }

    // Validar si el proyecto pertenece al usuario autenticado
    if (project.creador.toString() !== req.user.id) {
      return resp.status(401).json({ msg: "No autorizado" });
    }

    // Eliminamos la tarea
    await Task.findByIdAndRemove({ _id: req.params.id });
    resp.json({ msg: "Tarea eliminada" });
    
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ msg: "Hubo un error" });
  }
};
