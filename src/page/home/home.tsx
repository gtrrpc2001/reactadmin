import { useNavigate } from "react-router-dom";
import {
  listActions,
  nameActions,
} from "../../components/createslice/createslices";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../../axios/api/serverApi";
import { useEffect, useState } from "react";
import { Loading } from "../../components/component/loading/loading";
import { HomeBody } from "./body/body";
import { historyLast } from "../../axios/interface/history_last";

export default function Home() {
  const navigate = useNavigate();
  const eqSelector = useSelector<RootState, string>((state) => state.eq);
  const loginSelector = useSelector<RootState, boolean>((state) => state.check);
  const InfoDispatch = useDispatch<AppDispatch>();
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

        if (getData?.length !== 0 && !String(getData).includes("result")) {
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

    const timer = setInterval(async () => {
      if (loginSelector) await getInfoList();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [loginSelector, InfoDispatch, eqSelector, loading]);

  useEffect(() => {
    const table_modalData = () => {
      InfoDispatch(listActions.listHistory(data));
    };
    table_modalData();
  }, [data, InfoDispatch]);

  return <>{loading ? <Loading /> : <HomeBody />}</>;
}
