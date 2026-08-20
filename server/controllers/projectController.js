const Project = require('../models/Project');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// AI Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Logic for generating the architecture
const generateProject = async (req, res) => {
  try {
    const { techStack } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`Act as an expert software architect. Given this context: ${techStack}. Provide a detailed, innovative project architecture with Project Name, Problem, and Features.`);
    const aiResponse = result.response.text();

    const newProject = new Project({ techStack, aiResponse });
    await newProject.save();

    res.json({ success: true, data: aiResponse });
  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ error: "AI Engine Failure" });
  }
};

// Logic for fetching the history
const getProjectsHistory = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("Database Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};

// Logic for deleting a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ success: true, message: "Project securely deleted." });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Failed to delete project" });
  }
};

// Don't forget to export it!
module.exports = {
  generateProject,
  getProjectsHistory,
  deleteProject
};

