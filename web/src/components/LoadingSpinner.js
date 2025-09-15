import React from "react";
import { Box, CircularProgress, Typography, Fade } from "@mui/material";

const LoadingSpinner = ({ message = "載入中...", size = 40 }) => {
  return (
    <Fade in timeout={300}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
          gap: 2,
        }}
      >
        <CircularProgress
          size={size}
          thickness={4}
          sx={{
            color: "primary.main",
          }}
        />
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          {message}
        </Typography>
      </Box>
    </Fade>
  );
};

export default LoadingSpinner;
