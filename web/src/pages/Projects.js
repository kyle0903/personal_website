import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import {
  Launch as LaunchIcon,
  GitHub as GitHubIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { apiService } from "../services/apiService";
import LoadingSpinner from "../components/LoadingSpinner";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiService.getProjects();
        setProjects(data);
        setFilteredProjects(data);

        // 提取所有類別
        const uniqueCategories = [
          ...new Set(data.map((project) => project.category)),
        ];
        setCategories(["all", ...uniqueCategories]);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === selectedCategory)
      );
    }
  }, [selectedCategory, projects]);

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  const getCategoryDisplayName = (category) => {
    if (category === "all") return "全部";
    return category;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "warning";
      case "planned":
        return "info";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "已完成";
      case "in-progress":
        return "進行中";
      case "planned":
        return "規劃中";
      default:
        return status;
    }
  };

  if (loading) {
    return <LoadingSpinner message="正在載入專案資料..." />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* 頁面標題 */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 600 }}>
          我的作品集
        </Typography>
        <Typography variant="h6" color="text.secondary">
          探索我開發的各種專案和應用程式
        </Typography>
      </Box>

      {/* 分類篩選 */}
      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <FilterIcon sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="h6" color="text.secondary">
            依類別篩選
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 500,
                fontSize: "1rem",
                textTransform: "none",
                minWidth: "auto",
                px: 3,
              },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: 1.5,
              },
            }}
          >
            {categories.map((category) => (
              <Tab
                key={category}
                label={getCategoryDisplayName(category)}
                value={category}
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      {/* 專案統計 */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="body1" color="text.secondary">
          共 {filteredProjects.length} 個專案
          {selectedCategory !== "all" &&
            ` 在 "${getCategoryDisplayName(selectedCategory)}" 類別中`}
        </Typography>
      </Box>

      {/* 專案網格 */}
      <Grid container spacing={4}>
        {filteredProjects.map((project, index) => (
          <Grid item xs={12} sm={6} lg={4} key={project.id}>
            <Card
              sx={{
                height: "600px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  "& .project-image": {
                    transform: "scale(1.05)",
                  },
                  "& .project-overlay": {
                    opacity: 1,
                  },
                },
                transition: "all 0.3s ease-in-out",
              }}
            >
              {/* 專案圖片 */}
              <Box sx={{ position: "relative", overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={`https://backend-729408356870.asia-east1.run.app/${project.image_url}`}
                  alt={project.name}
                  className="project-image"
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

                {/* 懸停覆蓋層 */}
                <Box
                  className="project-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: "rgba(0, 0, 0, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    opacity: 0,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                >
                  <Button
                    component={Link}
                    to={`/projects/${project.id}`}
                    variant="contained"
                    size="small"
                    sx={{
                      borderRadius: 2,
                      bgcolor: "primary.main",
                      transition: "none",
                      "&:hover": {
                        bgcolor: "primary.dark",
                        transform: "none",
                      },
                    }}
                  >
                    查看詳情
                  </Button>

                  {project.github_url && (
                    <IconButton
                      component="a"
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        bgcolor: "background.paper",
                        color: "text.primary",
                        "&:hover": {
                          bgcolor: "background.default",
                        },
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
                  )}

                  {project.demo_url && (
                    <IconButton
                      component="a"
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        bgcolor: "background.paper",
                        color: "text.primary",
                        "&:hover": {
                          bgcolor: "background.default",
                        },
                      }}
                    >
                      <LaunchIcon />
                    </IconButton>
                  )}
                </Box>

                {/* 狀態標籤 */}
                <Chip
                  label={getStatusText(project.status)}
                  color={getStatusColor(project.status)}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    fontWeight: 500,
                    ...(project.status === "completed" && {
                      backgroundColor: "#4caf50",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#388e3c",
                      },
                    }),
                    ...(project.status === "in-progress" && {
                      backgroundColor: "#ff9800",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#f57c00",
                      },
                    }),
                    ...(project.status === "planned" && {
                      backgroundColor: "#9e9e9e",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#757575",
                      },
                    }),
                  }}
                />
              </Box>

              <CardContent
                sx={{
                  flexGrow: 1,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  height: "280px",
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  {project.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 3,
                    lineHeight: 1.6,
                    flexGrow: 1,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {project.description}
                </Typography>

                {/* 技術標籤 */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 2,
                    minHeight: "60px",
                    overflow: "hidden",
                  }}
                >
                  {project.tech_stack.slice(0, 6).map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: "0.75rem",
                        "&:hover": {
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                          borderColor: "primary.main",
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                    />
                  ))}
                  {project.tech_stack.length > 6 && (
                    <Chip
                      label={`+${project.tech_stack.length - 6}`}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: "0.75rem",
                        color: "text.secondary",
                      }}
                    />
                  )}
                </Box>

                {/* 類別標籤 */}
                <Chip
                  label={project.category}
                  color="secondary"
                  variant="outlined"
                  size="small"
                  sx={{ mt: "auto", alignSelf: "flex-start" }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 空狀態 */}
      {filteredProjects.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            此類別暫無專案
          </Typography>
          <Button onClick={() => setSelectedCategory("all")} variant="outlined">
            查看所有專案
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Projects;
