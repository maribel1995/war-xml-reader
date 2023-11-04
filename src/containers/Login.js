import { useState } from "react";
import { getAccessToken } from "../service/Service";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { TextField } from "../components/TextField";

export function Login({ onLogin }) {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const accessToken = await getAccessToken({
      password: login.password,
      username: login.username,
    });
    setIsLoading(false);
    onLogin(accessToken);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <Stack sx={{ padding: "30px", width: "300px" }}>
      <TextField
        required
        variant="filled"
        onChange={handleInputChange}
        label="Usuário"
        name="username"
        value={login.username}
      />
      <TextField
        required
        variant="filled"
        onChange={handleInputChange}
        label="Senha"
        name="password"
        value={login.password}
        type="password"
      />
      <LoadingButton
        onClick={handleClick}
        loading={isLoading}
        loadingPosition="start"
        disabled={!(login.username.length && login.password.length)}
        variant="contained"
      >
        Logar
      </LoadingButton>
    </Stack>
  );
}
