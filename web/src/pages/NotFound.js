import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
  Fade,
} from "@mui/material";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  SearchOff as SearchOffIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Fade in timeout={800}>
        <Card
          sx={{
            textAlign: "center",
            p: 6,
            background: `${theme.palette.primary.main}10`,
            border: 1,
            borderColor: "divider",
          }}
        >
          <CardContent>
            <SearchOffIcon
              sx={{
                fontSize: "6rem",
                color: "primary.main",
                mb: 3,
                opacity: 0.8,
              }}
            />

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: "4rem", md: "6rem" },
                fontWeight: 700,
                mb: 2,
                color: theme.palette.primary.main,
              }}
            >
              404
            </Typography>

            <Typography
              variant="h3"
              component="h2"
              sx={{ mb: 2, fontWeight: 600 }}
            >
              頁面不存在
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 4,
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              抱歉，您要尋找的頁面似乎不存在。可能是連結錯誤，或者頁面已被移動或刪除。
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
                component={Link}
                to="/"
                variant="contained"
                size="large"
                startIcon={<HomeIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  borderRadius: 3,
                }}
              >
                回到首頁
              </Button>

              <Button
                onClick={() => navigate(-1)}
                variant="outlined"
                size="large"
                startIcon={<ArrowBackIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  borderRadius: 3,
                }}
              >
                返回上一頁
              </Button>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="body2" color="text.secondary">
                或者您可以瀏覽：
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  mt: 2,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  component={Link}
                  to="/about"
                  variant="text"
                  size="small"
                >
                  關於我
                </Button>
                <Button
                  component={Link}
                  to="/projects"
                  variant="text"
                  size="small"
                >
                  作品集
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  variant="text"
                  size="small"
                >
                  聯絡我
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Container>
  );
};

export default NotFound;
