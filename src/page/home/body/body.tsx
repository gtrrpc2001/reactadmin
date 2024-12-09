import { Box } from "@mui/material";
import { Table } from "../../../components/component/table/table";
import "./body.scss";

export const HomeBody = () => {
  return (
    <div className="mainBody">
      <Box className="TableWarpper">
        <Table />
      </Box>
    </div>
  );
};
