import { Button } from "@mui/material";
import { Table } from "../../../components/component/table/table";
import "./body.scss";

type Props = {
  HandleLogout: () => Promise<void>;
  check: boolean;
  HandleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const HomeBody = ({ HandleLogout, check, HandleCheckbox }: Props) => {
  return (
    <div className="mainBody">
      <div className="clslogout">
        <Button
          variant="outlined"
          color="primary"
          className="headerLogout"
          onClick={HandleLogout}
        >
          로그아웃
        </Button>
      </div>

      <Table stopCheck={check} stopHandleCheckbox={HandleCheckbox} />
    </div>
  );
};
