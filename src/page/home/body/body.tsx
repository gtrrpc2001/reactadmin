import { Box } from "@mui/material";
import { Table } from "../../../components/component/table/table";
import "./body.scss";

type Props = {
  check: boolean;
  HandleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const HomeBody = ({ check, HandleCheckbox }: Props) => {
  return (
    <div className="mainBody">
      <Box className="TableWarpper">
        <Table />
      </Box>
    </div>
  );
};
