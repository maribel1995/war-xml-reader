import { useState } from "react";
import { getAccessToken } from "../service/Service";
import { Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { TextField } from "../components/TextField";

export function Login({ onLogin, permitedUsers }) {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isPermited, setIsPermited] = useState(true);
  // const permitedUsers = ["613672", "618295", "614294", "613738"];

  const handleClick = async () => {
    const permitido = permitedUsers.includes(login.username);
    setIsPermited(permitido);
    if (!permitido) return;
    setIsLoading(true);
    const accessToken = await getAccessToken({
      password: login.password,
      username: login.username,
    });
    setIsLoading(false);

    onLogin(accessToken, login.username);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <Stack alignItems={"center"}>
      <Typography variant="h4" sx={{ margin: "30px" }}>
        Faça login com a conta do Personal
      </Typography>

      <Stack sx={{ width: "300px" }}>
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
        <Typography variant="caption" sx={{ marginBottom: "10px" }}>
          * Os dados não são salvos, apenas utilizados para autenticação no
          Personal
        </Typography>
        <LoadingButton
          onClick={handleClick}
          loading={isLoading}
          loadingPosition="start"
          disabled={!(login.username.length && login.password.length)}
          variant="contained"
        >
          Logar
        </LoadingButton>
        {!isPermited && <p>Você não tem permissão</p>}
      </Stack>
    </Stack>
  );
}
