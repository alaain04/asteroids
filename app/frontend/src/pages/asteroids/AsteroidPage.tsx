import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import StarIcon from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import ZoomOutMap from "@mui/icons-material/ZoomOutMap";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import {
  addToAsteroidFavs,
  removeFromAsteroidFavs,
  retrieveAsteroids,
} from "../../api/asteroidApi";
import DynamicTable from "../../components/DynamicTable";
import { IAsteroid } from "../../interfaces/Asteroid";
import AsteroidDetailModal from "../../components/AsteroidDetailModal";
import { useSnackbar } from "../../SnackbarContext";

const AsteroidPage: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [asteroids, setAsteroids] = useState<IAsteroid[]>([]);
  const [selectedAsteroid, setSelectedAsteroid] = useState<IAsteroid>();
  const [dateFrom, setDateFrom] = useState<string | undefined>(
    moment().format("YYYY-MM-DD")
  );
  const [dateTo, setDateTo] = useState<string | undefined>(
    moment().subtract(1).format("YYYY-MM-DD")
  );
  const [justFavs, setJustFavs] = useState<boolean>(false);
  const [page, setPage] = React.useState(0);

  const loadAsteroids = async (callSnackbar: boolean = true) => {
    try {
      const response = await retrieveAsteroids(dateFrom!, dateTo!, justFavs);
      setAsteroids(response);

      if (callSnackbar)
        showSnackbar("Asteroids retrieved successfully!", "success");
    } catch (error) {
      showSnackbar(
        `There was an error retrieving the asteroids. Try again later.`,
        "error"
      );
      console.error(error);
    }
  };

  useEffect(() => {
    loadAsteroids();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToFavs = async (row: IAsteroid) => {
    try {
      await addToAsteroidFavs(row.id);
      showSnackbar(
        `The asteroid ${row.id} has been saved as favorite!`,
        "success"
      );
      await loadAsteroids(false);
    } catch (error) {
      showSnackbar(
        `There was an error adding the asteroid as favorite. Try again later.`,
        "error"
      );
      console.error(error);
    }
  };

  const removeFromFavs = async (row: IAsteroid) => {
    try {
      await removeFromAsteroidFavs(row.id, row.fav_id!);
      showSnackbar(
        `The asteroid ${row.id} has been deleted from favorite!`,
        "success"
      );
      await loadAsteroids(false);
    } catch (error) {
      showSnackbar(
        `There was an error deleting the asteroid favorite. Try again later.`,
        "error"
      );
      console.error(error);
    }
  };

  const seeAsteroidDetails = (row: IAsteroid) => {
    setSelectedAsteroid(row);
  };

  const closeModal = () => {
    setSelectedAsteroid(undefined);
  };

  const handleCheckFavs = (value: boolean) => {
    setJustFavs(value);
  };
  const search = async () => {
    await loadAsteroids();
    setPage(0);
  };

  type AlignType = "center" | "left" | "right" | undefined;
  const columns = [
    {
      id: "id",
      label: "#ID",
      align: "left" as AlignType,
      renderCell: (row: IAsteroid) => (
        <Typography fontWeight={600} textAlign={"left"}>
          {row?.id}
        </Typography>
      ),
    },
    {
      id: "name",
      label: "Name",
      align: "left" as AlignType,
      renderCell: (row: IAsteroid) => (
        <Typography fontWeight={600} textAlign={"left"}>
          {row?.name}
        </Typography>
      ),
    },
    {
      id: "date",
      label: "Date",
      renderCell: (row: IAsteroid) => (
        <Typography fontWeight={600} textAlign={"center"}>
          {row?.viewing_date}
        </Typography>
      ),
    },
    {
      id: "is_hazardous",
      label: "Is hazardous?",
      renderCell: (row: IAsteroid) => (
        <Typography fontWeight={600} textAlign={"center"}>
          {row?.is_potentially_hazardous_asteroid ? "Yes" : "No"}
        </Typography>
      ),
    },
    {
      id: "diameter_avg",
      label: "AVG Diameter (KM)",
      renderCell: (row: IAsteroid) => (
        <Typography fontWeight={600} textAlign={"center"}>
          {(
            (row?.estimated_diameter.kilometers.estimated_diameter_min +
              row?.estimated_diameter.kilometers.estimated_diameter_max) /
            2
          ).toFixed(6)}
        </Typography>
      ),
    },
    {
      id: "favorite",
      label: "Favs",
      renderCell: (row: IAsteroid) =>
        row.fav_id ? (
          <Box textAlign={"center"}>
            <IconButton onClick={() => removeFromFavs(row)}>
              <StarIcon fontSize="medium" sx={{ color: "#a1a10e" }} />
            </IconButton>
          </Box>
        ) : (
          <Box textAlign={"center"}>
            <IconButton onClick={() => addToFavs(row)}>
              <StarBorder fontSize="medium" sx={{ color: "#a1a10e" }} />
            </IconButton>
          </Box>
        ),
    },
    {
      id: "asteroid_details",
      label: "Actions",
      renderCell: (row: IAsteroid) => (
        <Box textAlign={"center"}>
          <IconButton onClick={() => seeAsteroidDetails(row)}>
            <ZoomOutMap fontSize="medium" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const lightColor = "#f5f5f5";
  const datepickerStyle = { backgroundColor: lightColor, borderRadius: "10px" };

  return (
    <>
      <h1>Asteroids</h1>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Grid
            container
            spacing={4}
            sx={{ alignItems: "flex-end", justifyContent: "flex-end" }}
          >
            <Grid size={3}>
              <DemoItem label="Date From">
                <DatePicker
                  maxDate={moment(dateTo)}
                  sx={datepickerStyle}
                  value={moment(dateFrom)}
                  onChange={(value) => {
                    setDateFrom(value?.format("YYYY-MM-DD"));
                  }}
                />
              </DemoItem>
            </Grid>
            <Grid size={3}>
              <DemoItem label="Date To">
                <DatePicker
                  maxDate={moment()}
                  minDate={moment(dateFrom)}
                  sx={datepickerStyle}
                  value={moment(dateTo)}
                  onChange={(value) => setDateTo(value?.format("YYYY-MM-DD"))}
                />
              </DemoItem>
            </Grid>
            <Grid size={2}>
              <FormControlLabel
                label="Just Favs"
                control={
                  <Checkbox
                    size="large"
                    color="primary"
                    onChange={(_event, checked) => handleCheckFavs(checked)}
                  />
                }
              />
            </Grid>
            <Grid size={3} display={"flex"} justifyContent={"end"}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate("/")}
                style={{
                  borderRadius: "10px",
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid size={1} display={"flex"} justifyContent={"end"}>
              <Button
                variant="contained"
                disabled={!dateTo || !dateFrom}
                color="primary"
                size="large"
                onClick={search}
                style={{
                  borderRadius: "10px",
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <DynamicTable
            columns={columns}
            rows={asteroids}
            styleProps={{
              backgroundColor: lightColor,
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            setPage={setPage}
            page={page}
          />
        </Grid>
      </Grid>

      {!!selectedAsteroid && (
        <AsteroidDetailModal
          data={selectedAsteroid!}
          handleClose={closeModal}
        />
      )}
    </>
  );
};

export default AsteroidPage;
