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

import React from "react";

interface SignupPage2Props {
  firstName: string;
  lastName: string;
  sex: string;
  birth: string | null;
  weight: string;
  height: string;
  handleFirstName: React.ChangeEventHandler<HTMLInputElement>;
  handleLastName: React.ChangeEventHandler<HTMLInputElement>;
  handleBirth: (value: string | null) => void;
  handleSex: (value: string) => void;
  handleWeight: React.ChangeEventHandler<HTMLInputElement>;
  handleHeight: React.ChangeEventHandler<HTMLInputElement>;
  handleNextButton: React.MouseEventHandler<HTMLButtonElement>;
  handlePrevButton: React.MouseEventHandler<HTMLButtonElement>;
}

export const SignUpUserInfo = (Props: SignupPage2Props) => {
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
          value={Props.firstName}
          onChange={Props.handleFirstName}
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
          value={Props.lastName}
          onChange={Props.handleLastName}
        />
      </Grid2>
      <Grid2 size={8} className="GridRow-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="BirthPicker"
            value={Props.birth}
            format="YYYY-MM-DD"
            onChange={(value: any, _: any) => Props.handleBirth(value)}
          />
        </LocalizationProvider>
      </Grid2>
      <Grid2 size={4} className="GridRow-center">
        <ToggleButtonGroup
          value={Props.sex}
          exclusive
          onChange={(_, value) => Props.handleSex(value)}
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
            value={Props.height}
            onChange={Props.handleHeight}
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
            value={Props.weight}
            onChange={Props.handleWeight}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
          />
        </FormControl>
      </Grid2>
    </Grid2>
  );
};
