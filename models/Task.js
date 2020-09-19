const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});
module.exports = mongoose.model('Task', TaskSchema);
