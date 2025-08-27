const supabase = require("../supabaseClient");

// Get all projects (public route with optional filtering and pagination)
async function getProjects(req, res) {
  try {
    const { category, featured, limit = 10, page = 1 } = req.query;

    // Build query
    let query = supabase
      .from("projects")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Apply filters
    if (category && category !== "all") {
      query = query.eq("category", category);
    }
    if (featured) {
      query = query.eq("featured", featured === "true");
    }

    // Apply pagination
    const from = (parseInt(page) - 1) * parseInt(limit);
    const to = from + parseInt(limit) - 1;
    query = query.range(from, to);

    // Execute query
    const { data: projects, error, count } = await query;

    if (error) throw error;

    res.json({
      projects: projects || [],
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || 0,
        pages: Math.ceil((count || 0) / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get projects error:", error);
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
}

// Get single project (public route)
async function getProject(req, res) {
  try {
    const { data: project, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({ message: "Project not found" });
      }
      throw error;
    }

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Get project error:", error);
    res
      .status(500)
      .json({ message: "Error fetching project", error: error.message });
  }
}

// Get all projects for admin (no pagination)
async function getAdminProjects(req, res) {
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ projects: projects || [] });
  } catch (error) {
    console.error("Get admin projects error:", error);
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
}

// Create new project (admin only)
async function createProject(req, res) {
  try {
    const { data: project, error } = await supabase
      .from("projects")
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
}

// Update project (admin only)
async function updateProject(req, res) {
  try {
    const { data: project, error } = await supabase
      .from("projects")
      .update(req.body)
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);
    res
      .status(500)
      .json({ message: "Error updating project", error: error.message });
  }
}

// Delete project (admin only)
async function deleteProject(req, res) {
  try {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    res
      .status(500)
      .json({ message: "Error deleting project", error: error.message });
  }
}

// Export all functions
module.exports = {
  getProjects,
  getProject,
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
  getAllPortfolios: getProjects,
  getPortfolioById: getProject,
  createPortfolio: createProject,
  updatePortfolio: updateProject,
  deletePortfolio: deleteProject,
};
