import { Box } from "@mui/material";
import { profileModal } from "../../../../../axios/interface/profileModal";
import { HeaderTextBox, TextBox } from "./textbox";

type Props = {
  cellValue: any;
  profile: profileModal;
};

export const BodyProfile = ({ cellValue, profile }: Props) => {
  const defaultInfo = () => {
    const marginLeft = 2;
    const paddingTop = 2;
    return (
      <>
        <TextBox
          children="휴대폰 번호"
          valueWidth={310}
          value={profile?.userphone}
        />
        <Box sx={{ display: "flex" }}>
          <TextBox
            sx={{ paddingTop: paddingTop }}
            children="생년월일"
            valueWidth={230}
            value={profile?.birth}
          />
          <TextBox
            sx={{ paddingTop: paddingTop, marginLeft: marginLeft }}
            children="나이"
            valueWidth={60}
            value={profile?.age}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <TextBox
            sx={{ paddingTop: paddingTop }}
            children="성별"
            valueWidth={70}
            value={profile?.sex}
          />
          <TextBox
            sx={{ paddingTop: paddingTop, marginLeft: marginLeft }}
            children="신장"
            valueWidth={100}
            value={profile?.height}
          />
          <TextBox
            sx={{ paddingTop: paddingTop, marginLeft: 2.3 }}
            children="몸무게"
            valueWidth={100}
            value={profile?.weight}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <TextBox
            sx={{ paddingTop: paddingTop }}
            children="취침시간"
            valueWidth={145}
            value={profile?.sleeptime}
          />
          <TextBox
            sx={{ paddingTop: paddingTop, marginLeft: marginLeft }}
            children="기상시간"
            valueWidth={145}
            value={profile?.uptime}
          />
        </Box>
      </>
    );
  };

  const goalSetting = () => {
    const marginLeft = 2;
    const paddingTop = 2;
    const smallWidth = 145;
    return (
      <>
        <TextBox
          sx={{ paddingTop: 2 }}
          children="활동 기준 bpm"
          valueWidth={310}
          value={`${profile?.bpm}  bpm`}
        />
        <Box sx={{ display: "flex" }}>
          <TextBox
            sx={{ paddingTop: paddingTop }}
            children="일일 목표 걸음수"
            valueWidth={smallWidth}
            value={`${profile?.step}  걸음`}
          />
          <TextBox
            sx={{ paddingTop: paddingTop, marginLeft: marginLeft }}
            children="걸음거리"
            valueWidth={smallWidth}
            value={`${profile?.distanceKM}  km`}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <TextBox
            sx={{ paddingTop: paddingTop }}
            children="활동 칼로리"
            valueWidth={smallWidth}
            value={`${profile?.calexe}  kcal`}
          />
          <TextBox
            sx={{ paddingTop: paddingTop, marginLeft: marginLeft }}
            children="일일 목표 소비칼로리"
            valueWidth={smallWidth}
            value={`${profile?.cal}  kcal`}
          />
        </Box>
      </>
    );
  };

  return (
    <Box sx={{ height: 625, marginTop: 2, ":hover": { cursor: "default" } }}>
      <Box sx={{ height: 120, bgcolor: "#f5d9b0" }}>
        <HeaderTextBox
          children={cellValue?.eqname}
          value={"님"}
          fontSize={20}
        />
        <HeaderTextBox
          children={"아이디 :"}
          value={cellValue?.eq}
          fontSize={14}
        />
        <HeaderTextBox
          children={"가입일 :"}
          value={profile?.signupdate}
          fontSize={14}
        />
      </Box>
      <Box sx={{ marginLeft: 2, paddingTop: 1, height: 505 }}>
        {defaultInfo()}

        {goalSetting()}
      </Box>
    </Box>
  );
};
