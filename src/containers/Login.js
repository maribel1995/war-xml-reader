import { useEffect, useState } from "react";
import { getAccessToken } from "../service/Service";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { TextField } from "../components/TextField";
import { getLojasCredenciadas } from "../service/Service";

export function Login({ onLogin }) {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isPermited, setIsPermited] = useState(true);
  const permitedUsers = ["613672", "618295", "614294"];

  useEffect(() => {
    const fetchLojasCredenciadas = async () => {
      const resp = await getLojasCredenciadas();
      const uniqueEmails = new Set();
      const dadosLojas = resp
        .map((loja) => ({
          email: loja.email,
          telefone: loja.telefone,
          responsavel: loja.responsavel,
        }))
        .filter((loja) => {
          if (uniqueEmails.has(loja.email)) {
            return false;
          } else {
            uniqueEmails.add(loja.email);
            return true;
          }
        });
      const emailStrings = [];
      let emailChunk = [];
      dadosLojas.forEach((loja, index) => {
        emailChunk.push(loja.email);
        if (emailChunk.length === 20 || index === dadosLojas.length - 1) {
          emailStrings.push(emailChunk.join(","));
          emailChunk = [];
        }
      });

      console.log(emailStrings);
    };
    fetchLojasCredenciadas();
  }, []);

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
      {!isPermited && <p>Você não tem permissão</p>}
    </Stack>
  );
}
