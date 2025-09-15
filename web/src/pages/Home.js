import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
} from "@mui/material";
import {
  ArrowForward as ArrowForwardIcon,
  Code as CodeIcon,
  Launch as LaunchIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { apiService } from "../services/apiService";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [aboutInfo, setAboutInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, aboutData] = await Promise.all([
          apiService.getProjects(),
          apiService.getAbout(),
        ]);
        setProjects(projectsData.slice(0, 3)); // 只顯示前三個專案
        setAboutInfo(aboutData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="正在載入個人資訊..." />;
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: { xs: "2rem", md: "2.8rem" },
                    fontWeight: 600,
                    mb: 2,
                    color: "text.primary",
                  }}
                >
                  你好，我是 {aboutInfo?.name || "Kyle"}
                </Typography>
                <Typography
                  variant="h4"
                  component="h2"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    fontWeight: 500,
                    mb: 3,
                  }}
                >
                  {aboutInfo?.title || "全端開發工程師"}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.9rem", md: "1.1rem" },
                    mb: 4,
                    lineHeight: 1.8,
                    maxWidth: "800px",
                    fontWeight: 400,
                    whiteSpace: "pre-line",
                    textAlign: "left",
                  }}
                >
                  {aboutInfo?.description ||
                    "熱愛技術的全端開發者，專精於現代化技術棧。"}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    component={Link}
                    to="/projects"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 3,
                      py: 1.5,
                      fontSize: "1rem",
                    }}
                  >
                    查看作品集
                  </Button>
                  <Button
                    component={Link}
                    to="/contact"
                    variant="text"
                    size="large"
                    sx={{
                      px: 3,
                      py: 1.5,
                      fontSize: "1rem",
                      "&:hover": {
                        backgroundColor: "#5a6b7d",
                        color: "white",
                      },
                    }}
                  >
                    聯絡我
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src="http://localhost:8000/api/static/images/profile.jpg"
                  sx={{
                    width: { xs: 200, md: 280 },
                    height: { xs: 200, md: 280 },
                    bgcolor: "primary.main",
                    fontSize: { xs: "4rem", md: "6rem" },
                  }}
                >
                  <CodeIcon sx={{ fontSize: "inherit" }} />
                </Avatar>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 技能區塊 */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            技術技能
          </Typography>
          <Typography variant="h6" color="text.secondary">
            我擅長的技術棧和工具
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {/* 前端技術 */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: 600, color: "primary.main" }}
              >
                前端技術
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.5,
                  justifyContent: "center",
                }}
              >
                {["React", "JavaScript", "HTML/CSS"].map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    variant="filled"
                    sx={{
                      fontSize: "0.9rem",
                      py: 1.5,
                      px: 1.5,
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                      color: "primary.main",
                      border: "none",
                      "&:hover": {
                        backgroundColor: "#5a6b7d",
                        color: "white",
                      },
                      transition: "all 0.2s ease",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          {/* 後端技術 */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: 600, color: "primary.main" }}
              >
                後端技術
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.5,
                  justifyContent: "center",
                }}
              >
                {["Python", "FastAPI", "Flask", "Node.js", "Express"].map(
                  (skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      variant="filled"
                      sx={{
                        fontSize: "0.9rem",
                        py: 1.5,
                        px: 1.5,
                        backgroundColor: "rgba(25, 118, 210, 0.1)",
                        color: "primary.main",
                        border: "none",
                        "&:hover": {
                          backgroundColor: "#5a6b7d",
                          color: "white",
                        },
                        transition: "all 0.2s ease",
                      }}
                    />
                  )
                )}
              </Box>
            </Box>
          </Grid>

          {/* 系統佈署與版本管理 */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: 600, color: "primary.main" }}
              >
                系統佈署與版本管理
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.5,
                  justifyContent: "center",
                }}
              >
                {["Docker", "Git", "GCP", "Linux", "Chrome Extension"].map(
                  (skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      variant="filled"
                      sx={{
                        fontSize: "0.9rem",
                        py: 1.5,
                        px: 1.5,
                        backgroundColor: "rgba(25, 118, 210, 0.1)",
                        color: "primary.main",
                        border: "none",
                        "&:hover": {
                          backgroundColor: "#5a6b7d",
                          color: "white",
                        },
                        transition: "all 0.2s ease",
                      }}
                    />
                  )
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* 精選專案 */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ mb: 2, fontWeight: 600 }}
            >
              精選專案
            </Typography>
            <Typography variant="h6" color="text.secondary">
              一些我最引以為傲的作品
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={4} key={project.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  component={Link}
                  to={`/projects/${project.id}`}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:8000${project.image_url}`}
                    alt={project.name}
                    sx={{
                      height: "300px",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
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
                      sx={{ mb: 3, lineHeight: 1.6 }}
                    >
                      {project.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        mb: 3,
                      }}
                    >
                      {project.tech_stack.slice(0, 3).map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          variant="filled"
                          sx={{
                            fontSize: "0.75rem",
                            backgroundColor: "rgba(25, 118, 210, 0.1)",
                            color: "primary.main",
                            border: "none",
                            "&:hover": {
                              backgroundColor: "#5a6b7d",
                              color: "white",
                            },
                          }}
                        />
                      ))}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        mt: "auto",
                      }}
                    >
                      {project.github_url && (
                        <Button
                          size="small"
                          startIcon={<GitHubIcon />}
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.github_url, "_blank");
                          }}
                        >
                          程式碼
                        </Button>
                      )}
                      {project.demo_url && (
                        <Button
                          size="small"
                          startIcon={<LaunchIcon />}
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.demo_url, "_blank");
                          }}
                        >
                          展示
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              component={Link}
              to="/projects"
              variant="text"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 3,
                py: 1.5,
                fontSize: "1rem",
                border: "none",
                "&:hover": {
                  backgroundColor: "#5a6b7d",
                  color: "white",
                },
              }}
            >
              查看所有專案
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
