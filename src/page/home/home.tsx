import { useNavigate } from "react-router-dom";
import {
  ModalActions,
  listActions,
  loginActions,
  nameActions,
} from "../../components/createslice/createslices";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { saveLog } from "../../data/login";
import { getHistory } from "../../axios/api/serverApi";
import { useEffect, useState } from "react";
import { Loading } from "../../components/component/loading/loading";
import { HomeBody } from "./body/body";
import { historyLast } from "../../axios/interface/history_last";
import { HeaderFooter } from "../Header_Footer/HeaderFooter";

export default function Home() {
  const navigate = useNavigate();
  const useCheckDispatch = useDispatch<AppDispatch>();
  const eqSelector = useSelector<RootState, string>((state) => state.eq);
  const loginSelector = useSelector<RootState, boolean>((state) => state.check);
  const InfoDispatch = useDispatch<AppDispatch>();
  const [check, setCheck] = useState(false);
  const [loading, setLoding] = useState(true);
  const [data, setData] = useState<historyLast[]>([]);

  useEffect(() => {
    if (!loginSelector) navigate("/");
  }, [loginSelector, navigate]);

  useEffect(() => {
    async function getInfoList() {
      try {
        const getData: historyLast[] = await getHistory(
          `/mslLast/webTable?eq=${eqSelector}`
        );

        if (loading) setLoding(false);

        if (getData?.length != 0 && !String(getData).includes("result")) {
          setData(getData);
          const names = getData.map((d: any) => {
            return { eq: d.eq, eqname: d.eqname };
          });
          InfoDispatch(nameActions.value(names));
        }
      } catch (E) {
        console.log(E);
        return [];
      }
    }

    let isMounted = true;
    const timer = setInterval(async () => {
      if (loginSelector) await getInfoList();
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [loginSelector]);

  useEffect(() => {
    const table_modalData = () => {
      if (check == false) InfoDispatch(listActions.listHistory(data));
      InfoDispatch(ModalActions.ModalHistory(data));
    };
    table_modalData();
  }, [data]);

  const HandleLogout = async () => {
    const loginBool = await saveLog(eqSelector, "로그아웃");
    useCheckDispatch(loginActions.loginCheck(!loginBool));
    navigate("/");
  };

  function HandleCheckbox(event: React.ChangeEvent<HTMLInputElement>): void {
    setCheck(event.target.checked);
  }

  return (
    <>
      <div>
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <HeaderFooter>
            <HomeBody
              HandleLogout={HandleLogout}
              check={check}
              HandleCheckbox={HandleCheckbox}
            />
          </HeaderFooter>
        )}
      </div>
    </>
  );
}
