import { Theme } from "@emotion/react";
import { Box, Divider, SxProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type props = {
  User: {
    eq: string;
    eqname: string;
    height: string;
    weight: string;
    age: string;
    birth: string;
    sleeptime: string;
    uptime: string;
    bpm: string;
    sex: string;
    step: string;
    distanceKM: string;
    cal: string;
    calexe: string;
  };
};

export const UserProfileBox = ({ User }: props) => {
  const [t, _i18n] = useTranslation();
  const labelSx: SxProps<Theme> = {
    fontSize: "0.85rem",
    color: "gray",
  };

  const valueSx: SxProps<Theme> = {
    fontSize: "0.9rem",
  };

  return (
    <Box>
      <Box
        paddingLeft={"15px"}
        paddingRight={"15px"}
        paddingTop={"10px"}
        paddingBottom={"10px"}
      >
        <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
          {User.eqname}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.85rem",
            color: "darkgray",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {User.eq}
        </Typography>
      </Box>
      <Divider />
      <Box
        paddingLeft={"15px"}
        paddingRight={"15px"}
        display={"flex"}
        paddingTop={"10px"}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        <Box>
          <Box>
            <Typography sx={{ ...labelSx }}>{t("Sex")}</Typography>
            <Typography sx={{ ...valueSx }}>{User.sex}</Typography>
          </Box>
          <Box paddingTop={"10px"}>
            <Typography sx={{ ...labelSx }}>{t("BPM Goal")}</Typography>
            <Typography sx={{ ...valueSx }}>{User.bpm} bpm</Typography>
          </Box>
        </Box>

        <Box>
          <Box>
            <Typography sx={{ ...labelSx }}>{t("Height")}</Typography>
            <Typography sx={{ ...valueSx }}>{User.height} cm</Typography>
          </Box>
          <Box paddingTop={"10px"}>
            <Typography sx={{ ...labelSx }}>{t("Sleep Hour")}</Typography>
            <Typography sx={{ ...valueSx }}>{User.sleeptime} 시</Typography>
          </Box>
        </Box>

        <Box>
          <Box>
            <Typography sx={{ ...labelSx }}>{t("Weight")}</Typography>
            <Typography sx={{ ...valueSx }}>{User.weight} Kg</Typography>
          </Box>
          <Box paddingTop={"10px"}>
            <Typography sx={{ ...labelSx }}>{t("Wake Up Hour")}</Typography>
            <Typography sx={{ ...valueSx }}>{User.uptime} 시</Typography>
          </Box>
        </Box>
      </Box>

      <Box display={"flex"} paddingTop={"10px"} justifyContent={"space-around"}>
        <Box display={"flex"} flexDirection={"column"}>
          <Box>
            <Typography sx={{ ...labelSx }}>{t("Steps Goal")}</Typography>
            <Typography sx={{ ...valueSx }}>
              {User.step} {t("Steps")}
            </Typography>
          </Box>
          <Box paddingTop={"10px"}>
            <Typography sx={{ ...labelSx }}>{t("Exe Calories")}</Typography>
            <Typography sx={{ ...valueSx }}>{User.calexe} kcal</Typography>
          </Box>
        </Box>

        <Box display={"flex"} flexDirection={"column"} paddingLeft={"10px"}>
          <Box>
            <Typography sx={{ ...labelSx }}>{t("Distance Goal")}</Typography>
            <Typography sx={{ ...valueSx }}>{User.distanceKM} Km</Typography>
          </Box>
          <Box paddingTop={"10px"}>
            <Typography sx={{ ...labelSx }}>{t("Calories")}</Typography>
            <Typography sx={{ ...valueSx }}>{User.cal} kcal</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
