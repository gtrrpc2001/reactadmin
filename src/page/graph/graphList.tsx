import { Box, Divider } from "@mui/material";
import { GraphBody } from "./graphbody";

type Props = {
  names: { eq: string; eqname: string }[];
};

export const GraphList = ({ names }: Props) => {
  return (
    <Box sx={{ width: 1652, height: 850 }}>
      <Box sx={{ marginTop: 5 }}>
        <GraphBody names={names} marginTop={0} />

        <Divider sx={{ marginTop: 5 }} />

        <GraphBody names={names} marginTop={5} />
      </Box>
    </Box>
  );
};
