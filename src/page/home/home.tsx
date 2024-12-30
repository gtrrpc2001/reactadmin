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
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const navigate = useNavigate();
  const eqSelector = useSelector<RootState, string>((state) => state.eq);
  const loginSelector = useSelector<RootState, boolean>((state) => state.check);
  const InfoDispatch = useDispatch<AppDispatch>();
  const [loading, setLoding] = useState(true);

  const { data } = useQuery<historyLast[], Error>({
    queryKey: ["historyData", eqSelector],
    queryFn: async () => getHistory(`/mslLast/webTable?eq=${eqSelector}`),
    enabled: loginSelector,
    refetchInterval: loginSelector ? 1000 : false,
  });

  useEffect(() => {
    if (!loginSelector) navigate("/");
  }, [loginSelector, navigate]);

  useEffect(() => {
    async function getInfoList() {
      try {
        if (data && data?.length > 0 && !String(data).includes("result")) {
          if (loading) setLoding(false);
          const names = data.map((d: any) => {
            return { eq: d.eq, eqname: d.eqname };
          });
          InfoDispatch(nameActions.value(names));
          InfoDispatch(listActions.listHistory(data));
        }
      } catch (E) {
        console.log(E);
        return [];
      }
    }

    getInfoList();
  }, [data, InfoDispatch]);

  return <>{loading ? <Loading /> : <HomeBody />}</>;
}
