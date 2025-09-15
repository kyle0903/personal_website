import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Slide,
  useScrollTrigger,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Code as CodeIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const menuItems = [
    { text: "首頁", path: "/" },
    { text: "關於我", path: "/about" },
    { text: "作品集", path: "/projects" },
    { text: "聯絡我", path: "/contact" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [location]);

  const drawer = (
    <Box sx={{ width: 250, height: "100%", bgcolor: "background.paper" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src="/logo192.png"
            sx={{
              width: 32,
              height: 32,
              bgcolor: "primary.main",
            }}
          >
            <CodeIcon sx={{ fontSize: "1.2rem" }} />
          </Avatar>
          <Typography
            variant="h6"
            component="div"
            color="primary"
            fontWeight="bold"
          >
            Kyle
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleDrawerClose}
              sx={{
                "&:hover": {
                  bgcolor: "action.hover",
                },
                ...(location.pathname === item.path && {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }),
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          sx={{
            bgcolor: "background.default",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Toolbar>
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
                color: "inherit",
                flexGrow: { xs: 1, md: 0 },
              }}
            >
              <img
                src="/logo192.png"
                alt="Kyle"
                style={{
                  width: 64,
                  height: 64,
                }}
              />
            </Box>

            {!isMobile && (
              <Box sx={{ display: "flex", ml: "auto", gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    sx={{
                      color: "text.primary",
                      fontWeight: 500,
                      position: "relative",
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                      ...(location.pathname === item.path && {
                        color: "primary.main",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "80%",
                          height: 2,
                          bgcolor: "primary.main",
                          borderRadius: 1,
                        },
                      }),
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ color: "text.primary" }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
