import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  useTheme,
  Fade,
  Divider,
} from "@mui/material";
import {
  Code as CodeIcon,
  School as SchoolIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import { apiService, API_BASE_URL } from "../services/apiService";
import LoadingSpinner from "../components/LoadingSpinner";

const About = () => {
  const theme = useTheme();
  const [aboutInfo, setAboutInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutInfo = async () => {
      try {
        const data = await apiService.getAbout();
        setAboutInfo(data);
      } catch (error) {
        console.error("Failed to fetch about info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutInfo();
  }, []);

  // 從後端資料取得內容，如果沒有則使用預設值
  const skillCategories = aboutInfo?.skill_categories || {};
  const experiences = aboutInfo?.experiences || [];

  if (loading) {
    return <LoadingSpinner message="正在載入個人資訊..." />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* 個人介紹區塊 */}
      <Fade in timeout={800}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Avatar
            src={`${API_BASE_URL}api/static/images/profile.jpg`}
            sx={{
              width: 150,
              height: 150,
              mx: "auto",
              mb: 3,
              bgcolor: "primary.main",
              fontSize: "3rem",
            }}
          >
            <CodeIcon sx={{ fontSize: "inherit" }} />
          </Avatar>
          <Typography
            variant="h2"
            component="h1"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            關於 {aboutInfo?.name || "讀取中..."}
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            sx={{ mb: 3, fontWeight: 500 }}
          >
            {aboutInfo?.title || "讀取中..."}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.8,
              fontSize: "1.1rem",
              fontWeight: 400,
              whiteSpace: "pre-line",
              textAlign: "left",
            }}
          >
            {aboutInfo?.description ||
              "讀取中..."}
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={6}>
        {/* 技術技能 */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={1200}>
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <CodeIcon
                    sx={{ mr: 2, color: "primary.main", fontSize: "2rem" }}
                  />
                  <Typography variant="h4" component="h2" fontWeight={600}>
                    技術技能
                  </Typography>
                </Box>

                {Object.entries(skillCategories).map(([category, skills]) => (
                  <Box key={category} sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, fontWeight: 500, color: "primary.main" }}
                    >
                      {category}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {skills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          variant="outlined"
                          sx={{
                            "&:hover": {
                              bgcolor: "primary.main",
                              color: "primary.contrastText",
                              borderColor: "primary.main",
                            },
                            transition: "all 0.3s ease-in-out",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* 經歷 */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={1600}>
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <WorkIcon
                    sx={{ mr: 2, color: "primary.main", fontSize: "2rem" }}
                  />
                  <Typography variant="h4" component="h2" fontWeight={600}>
                    經歷
                  </Typography>
                </Box>

                {experiences.map((exp, index) => (
                  <Box
                    key={index}
                    sx={{ mb: index < experiences.length - 1 ? 4 : 0 }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          width: 40,
                          height: 40,
                          mr: 2,
                          mt: 0.5,
                        }}
                      >
                        {index === 0 ? <WorkIcon /> : <SchoolIcon />}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {exp.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary.main"
                          fontWeight={500}
                        >
                          {exp.company}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {exp.period}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.6,
                            whiteSpace: "pre-line",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: exp.description,
                          }}
                        />
                      </Box>
                    </Box>
                    {index < experiences.length - 1 && (
                      <Divider sx={{ my: 2 }} />
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* 聯絡資訊 */}
        <Grid item xs={12}>
          <Fade in timeout={2400}>
            <Card
              sx={{
                background: `${theme.palette.primary.main}10`,
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  讓我們合作吧！
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                  如果你對我的作品感興趣，或想要合作開發專案，歡迎隨時聯絡我。
                </Typography>
                <Typography
                  variant="body1"
                  color="primary.main"
                  fontWeight={500}
                >
                  {aboutInfo?.contact?.email || "nswer_kyle@portonmail.com"}
                </Typography>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
