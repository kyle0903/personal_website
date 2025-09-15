import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { ErrorOutline as ErrorOutlineIcon } from "@mui/icons-material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Card
            sx={{
              textAlign: "center",
              p: 4,
              bgcolor: "background.paper",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <ErrorOutlineIcon
                sx={{
                  fontSize: "4rem",
                  color: "error.main",
                  mb: 2,
                }}
              />
              <Typography
                variant="h4"
                component="h1"
                sx={{ mb: 2, fontWeight: 600 }}
              >
                哎呀！出了點問題
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
              >
                網站遇到了一個意外的錯誤。請重新整理頁面，或者聯絡我們尋求協助。
              </Typography>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={this.handleRefresh}
                  sx={{ px: 4 }}
                >
                  重新整理頁面
                </Button>
                <Button variant="outlined" href="/" sx={{ px: 4 }}>
                  回到首頁
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
