import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

// 組件
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

// 頁面
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// 極簡主義主題
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5a6b7d", // 深藍灰色
      light: "#7a8b9d",
      dark: "#4a5b6d",
    },
    secondary: {
      main: "#666666", // 中性灰
      light: "#9e9e9e",
      dark: "#424242",
    },
    background: {
      default: "#d5cdcb",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
  },
  typography: {
    fontFamily:
      '"Inter", "Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: "clamp(2rem, 5vw, 3rem)",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 600,
      fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 500,
      fontSize: "clamp(1.5rem, 3vw, 1.75rem)",
      lineHeight: 1.4,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontWeight: 500,
      fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
      lineHeight: 1.4,
      letterSpacing: "-0.005em",
    },
    h5: {
      fontWeight: 500,
      fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
          fontWeight: 500,
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          },
          transition: "all 0.2s ease",
        },
        contained: {
          background: "#5a6b7d",
          "&:hover": {
            background: "#4a5b6d",
          },
        },
        outlined: {
          borderColor: "#e0e0e0",
          "&:hover": {
            borderColor: "#5a6b7d",
            background: "#f5f5f5",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          background: "#f8f6f5",
          border: "1px solid #e8e0dd",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.2s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: "#f5f5f5",
          border: "1px solid #e0e0e0",
          transition: "all 0.2s ease",
          "&:hover": {
            background: "#e0e0e0",
            borderColor: "#5a6b7d",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
          "@media (min-width:600px)": {
            paddingLeft: 24,
            paddingRight: 24,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#d5cdcb",
          borderBottom: "1px solid #e0e0e0",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Navbar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                pt: { xs: 8, sm: 9 }, // 為導航欄留出空間
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
            <ScrollToTop />
          </Box>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
