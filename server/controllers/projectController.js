const Project = require('../models/Project');

const Groq = require('groq-sdk');




const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


const generateProject = async (req, res) => {
  try {
    const { techStack, projectScale, generatePitch, currentBlueprint } = req.body;
    
   let systemPrompt = "";
   if (generatePitch === true || generatePitch === "true") {
      systemPrompt = `You are an expert pitch strategist and startup investor coach. 
      
Based strictly on the software architecture system blueprint provided here:
${currentBlueprint}

Your task is to generate a comprehensive, high-impact 5-slide pitch presentation outline deck tailored to impress hackathon judges and venture investors.

### STARK FORMATTING RULES (CRITICAL):
1. Output valid Markdown formatting ONLY. Use clear section headers (e.g., ## Slide 1: Title) and bullet points.
2. NEVER use markdown pipe tables (no '| Column |') and NEVER use HTML tags. 
3. Do NOT output any preamble introductory small talk or chat remarks. Start directly with the Slide 1 header content.
4. Keep slide descriptions sharp, high-energy, and completely focused on market validation, core requirements, and value optimization.
5.Keep the project name highlighted and bold at the very top line, givng in a valid Markdown formatting ONLY (eg. ## Pitch deck generated for the project: [project_name])`;

    // ─── BRANCH B: GENERATE THE PRIMARY ARCHITECTURE BLUEPRINT ───
    } else {
      systemPrompt = `You are an expert enterprise software architect and product strategist. 

Your task is to generate a comprehensive, innovative project idea and blueprint tailored specifically for developers trying to practice their skills.

### INPUT PARAMETERS:
- Developer Tech Stack: ${techStack}
- Target Project Scale: ${projectScale} (Strictly tailor the complexity, features, and system architecture design to this scale).

// Keep everything else the same, just swap the STARK FORMATTING RULES section:

### STARK FORMATTING RULES (CRITICAL):
1. Output valid Markdown formatting for headers, text emphasis, and standard bulleted lists.
2. NEVER use markdown tables (no pipes like '| Column |') and NEVER use HTML tags (no <table>, <tr>, <td>). They break the frontend parser.
3. For Database Schema Design, you MUST output the structural data as a standard JSON code-block (\`\`\`json ... \`\`\`).
4. For API Route Architecture and Architecture Diagrams, you MUST output them inside standard text code-blocks (\`\`\`text ... \`\`\`).


### REQUIRED OUTPUT SECTIONS:

## 🌐 Project Overview
- **Project Name**: Generate a unique, catchy tech name.
- **Concept**: Explain what this project does and how it perfectly uses the provided tech stack.
- **Target Audience**: Who uses this platform?
- **Core Value Proposition**: Why does this project matter?

## ⚠️ Problem Statement
Provide 3-4 structured, bulleted entries highlighting the clear real-world problems this specific software aims to fix.

## 🚀 Core Feature Requirements (Tailored to: ${projectScale})
List out the application feature requirements using clear bold names and clean bulleted descriptions. 
*(If scale is Hackathon: focus on a fast, high-impact MVP scope. If Startup: include monetization hooks and growth vectors. If Enterprise: include high availability, security tools, and multi-tenant management).*

## 🏗️ High-Level System Architecture
Provide an ASCII structural block diagram inside a standard markdown text code-block showcasing how the client, server, database, and secondary integrations interact. Very important point to keep as a note: Do NOT use multiple empty trailing lines or repetitive vertical separator patterns.

## 💾 Database Schema Design
Provide a clean, comprehensive breakdown of the database collections/tables, fields, data types, and relationships structured strictly as a clean, production-ready JSON blueprint inside a single markdown json block (\`\`\`json ... \`\`\`).

## 🔌 API Route Architecture
Provide a clean, perfectly aligned plain text block diagram or list inside a markdown text code-block (\`\`\`text ... \`\`\`) showing the key REST endpoints. Follow this exact format line-by-line inside the block:
METHOD  /api/your-endpoint  -> Description | Payload: { fields }

## 🛠️ Step-by-Step Implementation Strategy
Break down the development roadmap chronologically into clear phases (Phase 1: Environment & Architecture Initialization, Phase 2: Core Engine & DB Development, Phase 3: Integration & Polish).`;
    }

     const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: systemPrompt
                }
            ],
            model: "openai/gpt-oss-20b",
            temperature: 0.1,
            max_completion_tokens: 32768
        });
    const aiResponse = chatCompletion.choices[0]?.message?.content || "";

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

