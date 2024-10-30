import { Box, Divider } from "@mui/material";
import { GraphBody } from "./graphbody";

type Props = {
  names: { eq: string; eqname: string }[];
};

export const GraphList = ({ names }: Props) => {
  return (
    <Box>
      <Box sx={{ marginTop: 5 }}>
        <GraphBody names={names} marginTop={0} marginBottom={0} />

        <Divider sx={{ marginTop: 5 }} />

        <GraphBody names={names} marginTop={5} marginBottom={3} />
      </Box>
    </Box>
  );
};
