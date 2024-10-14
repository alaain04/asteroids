import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const handleAsteroidsRedirect = () => {
    navigate("/asteroids");
  };

  return (
    <Container
      style={{
        textAlign: "center",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <Typography variant="h2" style={{ color: "#fff", marginBottom: "1rem" }}>
        Welcome to Asteroid Explorer
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleAsteroidsRedirect}
        style={{ padding: "1rem 2rem" }}
      >
        Explore Asteroids
      </Button>
    </Container>
  );
}

export default App;
