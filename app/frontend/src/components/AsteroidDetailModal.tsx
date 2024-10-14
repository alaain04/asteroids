import React from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IAsteroid } from "../interfaces/Asteroid";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "15px",
  maxHeight: "80vh",
  overflowY: "auto",
};
const textStyle = {
  color: "#333",
};

const customScrollbarStyle = {
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#ccc",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#999",
  },
};

interface IAsteroidDetailModalProps {
  handleClose: () => void;
  data: IAsteroid;
}
const AsteroidDetailModal: React.FC<IAsteroidDetailModalProps> = ({
  handleClose,
  data,
}: IAsteroidDetailModalProps) => {
  //pick just the first to avoid building a large modal
  const closeApproach = data.close_approach_data?.[0];
  return (
    <Modal open={!!data} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "gray",
            fontSize: "1.5rem",
            fontStyle: "bold",
          }}
          p={1}
        >
          <Box display="flex" sx={{ alignItems: "center" }}>
            <Typography
              variant="h6"
              px={3}
              sx={{ fontSize: "larger", fontStyle: "bold", ...textStyle }}
            >
              Asteroid #{data.id} - {data.name}
            </Typography>
            {data.fav_id ? (
              <StarIcon
                fontSize="large"
                sx={{ color: "#a1a10e", justifyContent: "left" }}
              />
            ) : (
              <StarBorder
                fontSize="large"
                sx={{ color: "#a1a10e", justifyContent: "left" }}
              />
            )}
          </Box>

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box p={3}>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid size={6} spacing={2}>
              <Typography variant="body1" sx={textStyle}>
                <strong>Name:</strong> {data.name}
              </Typography>
              <Typography variant="body1" sx={textStyle}>
                <strong>Magnitude:</strong> {data.absolute_magnitude_h}
              </Typography>
              <Typography variant="body1" sx={textStyle}>
                <strong>Potentially Hazardous:</strong>{" "}
                {data.is_potentially_hazardous_asteroid ? "Yes" : "No"}
              </Typography>
              <Typography variant="body1" sx={textStyle}>
                <strong>Diameter (km):</strong>{" "}
                {data.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                  2
                )}{" "}
                -{" "}
                {data.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                  2
                )}{" "}
                km
              </Typography>
              <Typography variant="body1" sx={textStyle}>
                <strong>Sentry Object:</strong>{" "}
                {data.is_sentry_object ? "Yes" : "No"}
              </Typography>
            </Grid>

            <Grid size={6} spacing={4}>
              <Typography variant="body1" sx={textStyle}>
                <strong>Close Approach Date:</strong>{" "}
                {closeApproach.close_approach_date}
              </Typography>
              <Typography variant="body1" sx={textStyle}>
                <strong>Velocity:</strong>{" "}
                {parseFloat(
                  closeApproach.relative_velocity.kilometers_per_hour
                ).toFixed(2)}{" "}
                km/h
              </Typography>
              <Typography variant="body1" sx={textStyle}>
                <strong>Miss Distance:</strong>{" "}
                {parseFloat(
                  closeApproach.miss_distance.kilometers
                ).toLocaleString()}{" "}
                km
              </Typography>
              <Typography variant="body1" sx={textStyle}>
                <strong>Orbiting Body:</strong> {closeApproach.orbiting_body}
              </Typography>
              <Typography variant="body1" sx={textStyle}>
                <strong>NASA JPL URL:</strong>{" "}
                <a
                  href={data.nasa_jpl_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              </Typography>
            </Grid>
          </Grid>

          {/* Raw data */}
          <Typography variant="body2" sx={{ color: "#666" }}>
            <strong>Raw Data:</strong>
          </Typography>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: "#f5f5f5", mt: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                whiteSpace: "pre-wrap",
                maxHeight: "150px",
                overflowY: "auto",
                ...customScrollbarStyle,
              }}
            >
              {JSON.stringify(data, null, 2)}
            </Typography>
          </Paper>
        </Box>
        <Box display="flex" justifyContent="right" m={2}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AsteroidDetailModal;
