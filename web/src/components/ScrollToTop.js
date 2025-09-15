import React, { useState, useEffect } from "react";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
  });

  useEffect(() => {
    setIsVisible(trigger);
  }, [trigger]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={isVisible}>
      <Fab
        color="primary"
        size="medium"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          zIndex: 1000,
          boxShadow: 3,
          "&:hover": {
            transform: "scale(1.1)",
            boxShadow: 6,
          },
          transition: "all 0.3s ease-in-out",
        }}
        aria-label="回到頂部"
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;
