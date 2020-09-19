const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.CreateProject = async (req, resp) => {
  try {
    // Validar el resultado de la validacion de campos
    const validationList = validationResult(req);

    if (!validationList.isEmpty()) {
      return resp.status(400).json({ error: validationList.array() });
    }

    // Crear un nuevo proyecto
    let project = new Project(req.body);

    // Guardar el creador via JWT
    project.creador = req.user.id;

    // Guardamos el proyecto
    project.save();
    resp.json(project);
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ msg: "Hubo un error" });
  }
};

// Obtiene Proyectos del usuario actual
exports.GetProjects = async (req, resp) => {
  try {
    const projects = await Project.find({ creador: req.user.id }).sort({
      creado: -1,
    });
    resp.json({ projects });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ msg: "Hubo un error" });
  }
};

// Actualiza un proyecto
exports.UpdateProject = async (req, resp) => {
  try {
    // Validar el resultado de la validacion de campos
    const validationList = validationResult(req);

    if (!validationList.isEmpty()) {
      return resp.status(400).json({ error: validationList.array() });
    }

    // Extraer la informacion del proyecto
    const { nombre } = req.body;
    const newProject = {};

    if (nombre) {
      newProject.nombre = nombre;
    }

    // Revisar el id
    let project = await Project.findById(req.params.id);
    // Revisar si existe el proyecto
    if (!project) {
      return resp.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Verificar el creador del proyecto
    if (project.creador.toString() !== req.user.id) {
      return resp.status(401).json({ msg: "No autorizado" });
    }

    // Actualizar
    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );

    resp.json(project);
  } catch (error) {
    console.log(error);
    resp.status(500).json({ msg: "Hubo un error" });
  }
};

// Eliminar un proyecto por su Id
exports.DeleteProject = async (req, resp) => {
  try {

     // Revisar el id
     let project = await Project.findById(req.params.id);
     // Revisar si existe el proyecto
     if (!project) {
       return resp.status(404).json({ msg: "Proyecto no encontrado" });
     }
 
     // Verificar el creador del proyecto
     if (project.creador.toString() !== req.user.id) {
       return resp.status(401).json({ msg: "No autorizado" });
     }

     // Eliminar el proyecto
     await Project.findOneAndRemove({_id: req.params.id});
     resp.json({ msg: "Proyecto eliminado" });

  } catch (error) {
    console.log(error);
    resp.status(500).json({ msg: "Hubo un error" });
  }
};
