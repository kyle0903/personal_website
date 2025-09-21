import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  useTheme,
  Fade,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Email as EmailIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Schedule as ScheduleIcon,
  Send as SendIcon,
  Code as CodeIcon,
} from "@mui/icons-material";
import { apiService, API_BASE_URL } from "../services/apiService";
import LoadingSpinner from "../components/LoadingSpinner";

const Contact = () => {
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

  const contactMethods = [
    {
      icon: <EmailIcon />,
      title: "電子信箱",
      content: aboutInfo?.contact?.email || "nswer_kyle@portonmail.com",
      action: () =>
        window.open(
          `mailto:${aboutInfo?.contact?.email || "nswer_kyle@portonmail.com"}`,
          "_self"
        ),
      actionText: "發送郵件",
      color: "primary",
    },
    {
      icon: <GitHubIcon />,
      title: "GitHub",
      content: aboutInfo?.contact?.github || "https://github.com/kyle0903",
      action: () =>
        window.open(
          aboutInfo?.contact?.github || "https://github.com/kyle0903",
          "_blank"
        ),
      actionText: "查看 GitHub",
      color: "inherit",
    },
    {
      icon: <LinkedInIcon />,
      title: "LinkedIn",
      content: aboutInfo?.contact?.linkedin || "暫未提供",
      action: aboutInfo?.contact?.linkedin
        ? () => window.open(aboutInfo.contact.linkedin, "_blank")
        : null,
      actionText: "查看 LinkedIn",
      color: "info",
      disabled: !aboutInfo?.contact?.linkedin,
    },
  ];

  const additionalInfo = [
    {
      icon: <LocationIcon />,
      title: "所在地區",
      content: "台灣 台北市/新北市",
    },
    {
      icon: <ScheduleIcon />,
      title: "工作時間",
      content: "週一至週五 9:00 - 18:00",
    },
    {
      icon: <PhoneIcon />,
      title: "回覆時間",
      content: "通常在 24 小時內回覆",
    },
  ];

  if (loading) {
    return <LoadingSpinner message="正在載入聯絡資訊..." />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* 頁面標題 */}
      <Fade in timeout={800}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            聯絡我
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            有專案合作想法？歡迎隨時聯絡我！
          </Typography>
          <Avatar
            src={`${API_BASE_URL}api/static/images/profile.jpg`}
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              bgcolor: "primary.main",
              fontSize: "3rem",
              mb: 2,
            }}
          >
            <CodeIcon sx={{ fontSize: "inherit" }} />
          </Avatar>
          <Typography variant="h5" fontWeight={500}>
            {aboutInfo?.name || "讀取中..."}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {aboutInfo?.title || "讀取中..."}
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={6}>
        {/* 聯絡方式 */}
        <Grid item xs={12} md={8}>
          <Fade in timeout={1200}>
            <Box>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                聯絡方式
              </Typography>
              <Grid container spacing={3}>
                {contactMethods.map((method, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      sx={{
                        height: "100%",
                        cursor:
                          method.action && !method.disabled
                            ? "pointer"
                            : "default",
                        opacity: method.disabled ? 0.6 : 1,
                        "&:hover": {
                          transform:
                            method.action && !method.disabled
                              ? "translateY(-4px)"
                              : "none",
                          boxShadow:
                            method.action && !method.disabled
                              ? theme.shadows[8]
                              : theme.shadows[1],
                        },
                        transition: "all 0.3s ease-in-out",
                      }}
                      onClick={
                        method.action && !method.disabled
                          ? method.action
                          : undefined
                      }
                    >
                      <CardContent sx={{ p: 3, textAlign: "center" }}>
                        <IconButton
                          sx={{
                            bgcolor: `${method.color}.main`,
                            color:
                              method.color === "inherit"
                                ? "text.primary"
                                : `${method.color}.contrastText`,
                            mb: 2,
                            "&:hover": {
                              bgcolor:
                                method.color === "inherit"
                                  ? "action.hover"
                                  : `${method.color}.dark`,
                            },
                          }}
                          disabled={method.disabled}
                        >
                          {method.icon}
                        </IconButton>
                        <Typography
                          variant="h6"
                          sx={{ mb: 1, fontWeight: 600 }}
                        >
                          {method.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2, wordBreak: "break-word" }}
                        >
                          {method.content}
                        </Typography>
                        {method.action && !method.disabled && (
                          <Button
                            variant="outlined"
                            size="small"
                            endIcon={<SendIcon />}
                            sx={{ borderRadius: 2 }}
                          >
                            {method.actionText}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Grid>

        {/* 其他資訊 */}
        <Grid item xs={12} md={4}>
          <Fade in timeout={1600}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  其他資訊
                </Typography>
                {additionalInfo.map((info, index) => (
                  <Box key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 3,
                      }}
                    >
                      <IconButton
                        sx={{
                          bgcolor: "action.hover",
                          mr: 2,
                          mt: 0.5,
                        }}
                        size="small"
                      >
                        {info.icon}
                      </IconButton>
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight={500}
                          sx={{ mb: 0.5 }}
                        >
                          {info.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {info.content}
                        </Typography>
                      </Box>
                    </Box>
                    {index < additionalInfo.length - 1 && (
                      <Divider sx={{ mb: 3 }} />
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>

      {/* 行動呼籲 */}
      <Fade in timeout={2000}>
        <Box
          sx={{
            mt: 8,
            p: 6,
            textAlign: "center",
            borderRadius: 4,
            background: `${theme.palette.primary.main}10`,
            border: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
            讓我們開始合作吧！
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
          >
            無論是網站開發、技術諮詢，還是任何想法的交流，我都很樂意與你合作。
            讓我們一起創造出色的產品！
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<EmailIcon />}
              onClick={() =>
                window.open(
                  `mailto:${
                    aboutInfo?.contact?.email || "讀取中..."
                  }`,
                  "_self"
                )
              }
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: 3,
              }}
            >
              立即聯絡
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<GitHubIcon />}
              onClick={() =>
                window.open(
                  aboutInfo?.contact?.github || "https://github.com/kyle0903",
                  "_blank"
                )
              }
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: 3,
              }}
            >
              查看 GitHub
            </Button>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
};

export default Contact;
