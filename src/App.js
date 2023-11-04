import "./App.css";
import { useState } from "react";
import { Stack } from "@mui/material";
import { InsertTransaction } from "./containers/InsertTransactionContainer/InsertTransaction";
import { Login } from "./containers/Login";

function App() {
  const [accessToken, setAccessToken] = useState(null);

  const handleLogin = (value) => setAccessToken(value);

  return (
    <Stack
      justifyContent="center"
      flexWrap="wrap"
      alignContent="center"
      sx={{ backgroundColor: "#282c34", minHeight: "100vh" }}
    >
      {accessToken ? (
        <InsertTransaction accessToken={accessToken} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Stack>
  );
}

export default App;
