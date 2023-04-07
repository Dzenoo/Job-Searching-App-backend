const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  salary: { type: Number, required: true },
  company: { type: String, required: true },
  time: { type: String, required: true },
  level: { type: String, required: true },
  skills: [{ type: Number, required: true }],
  schedule: { type: String, required: true },
  jobDescription: [{ type: Number, required: true }],
  shortDescription: { type: String, required: true },
  requirements: [{ type: Number, required: true }],
});

module.exports = mongoose.model("Job", JobSchema);
