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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  useTheme,
  Fade,
  Skeleton,
  Alert,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Launch as LaunchIcon,
  GitHub as GitHubIcon,
  CheckCircle as CheckCircleIcon,
  Code as CodeIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { apiService, API_BASE_URL } from "../services/apiService";

const ProjectDetail = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProject(id);
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch project:", error);
        setError("無法載入專案資訊");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

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
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
        <Skeleton
          variant="rectangular"
          height={400}
          sx={{ mb: 4, borderRadius: 2 }}
        />
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="text" width="100%" height={60} />
            <Skeleton variant="text" width="100%" height={100} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton
              variant="rectangular"
              height={300}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error || "專案不存在"}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/projects")}
          variant="outlined"
        >
          返回專案列表
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* 導航路徑 */}
      <Fade in timeout={600}>
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: theme.palette.text.secondary,
            }}
          >
            首頁
          </Link>
          <Link
            to="/projects"
            style={{
              textDecoration: "none",
              color: theme.palette.text.secondary,
            }}
          >
            作品集
          </Link>
          <Typography color="text.primary">{project.name}</Typography>
        </Breadcrumbs>
      </Fade>

      {/* 返回按鈕 */}
      <Fade in timeout={800}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/projects")}
          sx={{ mb: 4 }}
        >
          返回專案列表
        </Button>
      </Fade>

      <Grid container spacing={6}>
        {/* 主要內容 */}
        <Grid item xs={12} md={8}>
          <Fade in timeout={1000}>
            <Box>
              {/* 專案標題 */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  {project.name}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                  <Chip
                    label={getStatusText(project.status)}
                    color={getStatusColor(project.status)}
                    sx={{ fontWeight: 500 }}
                  />
                  <Chip
                    icon={<CategoryIcon />}
                    label={project.category}
                    color="secondary"
                    variant="outlined"
                  />
                </Box>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {project.description}
                </Typography>
              </Box>

              {/* 專案圖片 */}
              {project.image_url && (
                <Card sx={{ mb: 4, overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    image={`${API_BASE_URL}${project.image_url}`}
                    alt={project.name}
                    sx={{
                      height: { xs: 250, md: 400 },
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </Card>
              )}

              {/* 專案功能 */}
              <Card sx={{ mb: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                    主要功能
                  </Typography>
                  <List>
                    {project.features.map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{
                            fontSize: "1.1rem",
                            fontWeight: 500,
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>

              {/* 技術棧 */}
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <CodeIcon
                      sx={{ mr: 2, color: "primary.main", fontSize: "2rem" }}
                    />
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      使用技術
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {project.tech_stack.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        variant="outlined"
                        sx={{
                          fontSize: "1rem",
                          py: 3,
                          px: 2,
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                            borderColor: "primary.main",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.3s ease-in-out",
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Fade>
        </Grid>

        {/* 側邊欄 */}
        <Grid item xs={12} md={4}>
          <Fade in timeout={1400}>
            <Box sx={{ position: "sticky", top: 100 }}>
              {/* 快速連結 */}
              <Card sx={{ mb: 4 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    快速連結
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {project.github_url && (
                      <Button
                        component="a"
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        startIcon={<GitHubIcon />}
                        fullWidth
                        sx={{
                          justifyContent: "flex-start",
                          py: 1.5,
                        }}
                      >
                        查看程式碼
                      </Button>
                    )}
                    {project.demo_url && (
                      <Button
                        component="a"
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        startIcon={<LaunchIcon />}
                        fullWidth
                        sx={{
                          justifyContent: "flex-start",
                          py: 1.5,
                        }}
                      >
                        線上展示
                      </Button>
                    )}
                    {!project.github_url && !project.demo_url && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "center", py: 2 }}
                      >
                        暫無外部連結
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

              {/* 專案資訊 */}
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    專案資訊
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        狀態
                      </Typography>
                      <Chip
                        label={getStatusText(project.status)}
                        color={getStatusColor(project.status)}
                        size="small"
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        類別
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {project.category}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        主要技術
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {project.tech_stack.slice(0, 2).join(", ")}
                        {project.tech_stack.length > 2 &&
                          ` 等 ${project.tech_stack.length} 項技術`}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectDetail;
