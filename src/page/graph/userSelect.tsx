import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { graphKindButton } from "../../axios/interface/graph";
import { useEffect, useState } from "react";
import { UserProfileBox } from "./userProfileBox";
import { GetProfile } from "../../data/graph";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type User = {
  eq: string;
  eqname: string;
};

export type ChangeHandler = (
  event: React.SyntheticEvent,
  value: User | null,
  reason: string
) => void;

type UserSelectProps = {
  userList: User[];
  onChange: ChangeHandler;
  data: any[];
  dataKind: graphKindButton;
};

export const UserSelect = ({ userList, onChange }: UserSelectProps) => {
  const [selectedUser, setSelecedUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const url = useSelector<RootState, string>((state) => state.comboBoxSelected);

  const handleProfile = async (eq: string) => {
    const profile = await GetProfile(eq, url);
    setUserProfile(profile);
  };

  useEffect(() => {
    if (selectedUser) {
      handleProfile(selectedUser.eq);
    }
  }, [selectedUser]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
      }}
    >
      <Autocomplete
        disablePortal
        options={userList}
        sx={{
          width: "300px",
          padding: 0,
        }}
        getOptionLabel={(option) => option.eqname}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box key={key} component="li" {...optionProps}>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                }}
              >
                {option.eqname}
              </Typography>
              <Typography
                sx={{
                  color: "darkgray",
                  fontSize: "0.8rem",
                  paddingLeft: "5px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {option.eq}
              </Typography>
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="사용자"
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiInputBase-root": {
                height: "45px",
                ".MuiInputBase-input": {
                  fontSize: "0.85rem",
                },
              },
            }}
          />
        )}
        onChange={(e, value, reason) => {
          setSelecedUser(value);
          onChange(e, value, reason);
        }}
      />
      <Box
        sx={{
          width: "100%",
          flexGrow: 1,
          border: "solid",
          borderWidth: 1,
          borderRadius: 2,
          borderColor: "#BCBCBC",
          marginTop: "10px",
        }}
      >
        {userProfile ? <UserProfileBox User={userProfile} /> : ""}
      </Box>
    </Box>
  );
};
