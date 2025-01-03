import "./App.css";
import { useState } from "react";
import { Stack } from "@mui/material";
import { InsertTransaction } from "./containers/InsertTransactionContainer/InsertTransaction";
import { Login } from "./containers/Login";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const handleLogin = (value, user) => {
    setAccessToken(value);
    setUser(user);
  };
  const users = {
    618295: "NF",
    613672: "CF",
    614294: "NF",
    613738: "CF",
    627111: "NF",
    627106: "NF",
    623961: "CF",
  };

  return (
    <Stack
      justifyContent="center"
      flexWrap="wrap"
      alignContent="center"
      sx={{ backgroundColor: "#282c34", minHeight: "100vh" }}
    >
      {accessToken ? (
        <InsertTransaction
          accessToken={accessToken}
          xmlStrategy={users[user]}
        />
      ) : (
        <Login onLogin={handleLogin} permitedUsers={Object.keys(users)} />
      )}
    </Stack>
  );
}

export default App;
