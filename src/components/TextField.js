import { TextField as MuiTextField } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const BaseTextField = styled((props) => (
  <MuiTextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#1A2027",
    border: "1px solid",
    borderColor: "#2D3843",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export function TextField(props) {
  return <BaseTextField {...props} sx={{ margin: "10px" }} />;
}
