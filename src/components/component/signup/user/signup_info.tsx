import {
  FormControl,
  Grid2,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSignUpContext } from "../../hooks/context/signup_context";

export const SignUpUserInfo = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    sex,
    setSex,
    birth,
    setBirth,
    weight,
    setWeight,
    height,
    setHeight,
  } = useSignUpContext();

  return (
    <Grid2 container>
      <Grid2 size={8} className="GridRow-center" sx={{ paddingRight: 2 }}>
        <TextField
          name="firstname"
          fullWidth={true}
          className="signupInput"
          type=""
          variant="outlined"
          label="이름"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Grid2>

      <Grid2 size={4} className="GridRow-center">
        <TextField
          name="lastname"
          fullWidth={true}
          className="signupInput"
          type=""
          variant="outlined"
          label="성"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Grid2>
      <Grid2 size={8} className="GridRow-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="BirthPicker"
            value={birth}
            format="YYYY-MM-DD"
            onChange={(value: any, _: any) => setBirth(value)}
          />
        </LocalizationProvider>
      </Grid2>
      <Grid2 size={4} className="GridRow-center">
        <ToggleButtonGroup
          value={sex}
          exclusive
          onChange={(_, value) => setSex(value)}
        >
          <ToggleButton className="sexSelect" value={"남자"}>
            남
          </ToggleButton>
          <ToggleButton className="sexSelect" value={"여자"}>
            여
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid2>
      <Grid2 size={6} className="GridRow-center" sx={{ paddingRight: 2 }}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="weight">키</InputLabel>
          <OutlinedInput
            name="height"
            label="키"
            fullWidth={true}
            id="weight"
            className="signupInput"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
          />
        </FormControl>
      </Grid2>

      <Grid2 size={6} className="GridRow-center">
        <FormControl variant="outlined">
          <InputLabel htmlFor="weight">몸무게</InputLabel>
          <OutlinedInput
            name="weight"
            label="몸무게"
            fullWidth={true}
            id="weight"
            className="signupInput"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
          />
        </FormControl>
      </Grid2>
    </Grid2>
  );
};
