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
        <button className="logoutbutton" onClick={HandleLogout}>
          로그아웃
        </button>
      </div>

      <Table stopCheck={check} stopHandleCheckbox={HandleCheckbox} />
    </div>
  );
};
