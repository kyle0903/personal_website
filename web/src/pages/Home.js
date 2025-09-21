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
  Fade,
  Slide,
  Grow,
} from "@mui/material";
import {
  ArrowForward as ArrowForwardIcon,
  Code as CodeIcon,
  Launch as LaunchIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { apiService, API_BASE_URL } from "../services/apiService";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [aboutInfo, setAboutInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHero, setShowHero] = useState(false);

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
        // 延遲顯示Hero動畫
        setTimeout(() => setShowHero(true), 300);
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
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(108, 117, 125, 0.03) 0%, rgba(73, 80, 87, 0.05) 100%)",
            zIndex: 1,
          },
          "& > *": {
            position: "relative",
            zIndex: 2,
          },
        }}
      >
        <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%", maxWidth: "1000px" }}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <Grid item xs={12} md={6}>
                <Fade in={showHero} timeout={1000}>
                  <Box sx={{ mb: 3, textAlign: { xs: "center", md: "left" } }}>
                    <Slide direction="right" in={showHero} timeout={800}>
                      <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                          fontSize: { xs: "2rem", md: "2.8rem" },
                          fontWeight: 600,
                          mb: 2,
                          color: "#2d3748",
                          background: "linear-gradient(135deg, #2d3748 0%, #4a5568 100%)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        你好，我是 {aboutInfo?.name || "讀取中..."}
                      </Typography>
                    </Slide>
                    <Slide direction="right" in={showHero} timeout={800}>
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
                        {aboutInfo?.title || "讀取中..."}
                      </Typography>
                    </Slide>
                    <Slide direction="right" in={showHero} timeout={1200}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "1.1rem",
                          lineHeight: 1.6,
                          color: "text.secondary",
                          mb: 4,
                          textAlign: { xs: "center", md: "left" },
                          maxWidth: "500px",
                        }}
                      >
                        具兩年 Python (Flask/FastAPI) 網頁後端經驗的工程師
                        <br />
                        專長於 RESTful API 設計、資料處理與系統整合，熟悉資料庫操作與 CI/CD 部署流程。
                      </Typography>
                    </Slide>
                    
                    <Grow in={showHero} timeout={1400}>
                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-start" } }}>
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
                            transform: "translateY(0)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                            },
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
                            transform: "translateY(0)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: "#6b7280",
                              color: "white",
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 25px rgba(107, 114, 128, 0.3)",
                            },
                          }}
                        >
                          聯絡我
                        </Button>
                      </Box>
                    </Grow>
                  </Box>
                </Fade>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "center" },
                    alignItems: "center",
                  }}
                >
                  <Slide direction="left" in={showHero} timeout={800}>
                    <Box
                      sx={{
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: "-10px",
                          left: "-10px",
                          right: "-10px",
                          bottom: "-10px",
                          background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)",
                          borderRadius: "50%",
                          opacity: 0.3,
                          zIndex: -1,
                          animation: "pulse 2s infinite",
                        },
                        "@keyframes pulse": {
                          "0%": {
                            transform: "scale(1)",
                            opacity: 0.3,
                          },
                          "50%": {
                            transform: "scale(1.05)",
                            opacity: 0.1,
                          },
                          "100%": {
                            transform: "scale(1)",
                            opacity: 0.3,
                          },
                        },
                      }}
                    >
                      <Avatar
                        src={`${API_BASE_URL}api/static/images/profile.jpg`}
                        sx={{
                          width: { xs: 150, md: 200 },
                          height: { xs: 150, md: 200 },
                          bgcolor: "#5a6b7d",
                          fontSize: { xs: "4rem", md: "6rem" },
                          transition: "all 0.3s ease",
                          border: "4px solid white",
                          boxShadow: "0 10px 30px rgba(99, 102, 241, 0.15)",
                          "&:hover": {
                            transform: "scale(1.05) rotate(5deg)",
                            boxShadow: "0 20px 40px rgba(99, 102, 241, 0.25)",
                          },
                        }}
                      >
                        <CodeIcon sx={{ fontSize: "inherit" }} />
                      </Avatar>
                    </Box>
                  </Slide>
                </Box>
              </Grid>
            </Grid>
          </Box>
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
                sx={{ mb: 3, fontWeight: 600, color: "#5a6b7d" }}
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
                      backgroundColor: "#e0e7ff",
                      color: "#5a6b7d",
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
                sx={{ mb: 3, fontWeight: 600, color: "#5a6b7d" }}
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
                        backgroundColor: "#e0e7ff",
                        color: "#5a6b7d",
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
                sx={{ mb: 3, fontWeight: 600, color: "#5a6b7d" }}
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
                        backgroundColor: "#e0e7ff",
                        color: "#5a6b7d",
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
                    image={`${API_BASE_URL}${project.image_url}`}
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
                            backgroundColor: "#e0e7ff",
                            color: "#5a6b7d",
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
