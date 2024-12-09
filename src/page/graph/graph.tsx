import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/component/loading/loading";
import { GraphList } from "./graphList";
import { HeaderFooter } from "../Header_Footer/HeaderFooter";

export const Graph = () => {
  const navigate = useNavigate();
  const [loading, setLoding] = useState(true);
  const loginSelector = useSelector<RootState, boolean>((state) => state.check);
  const names = useSelector<RootState, { eq: string; eqname: string }[]>(
    (state) => state.names
  );
  const memoizedNames = useMemo(() => names, [names]);

  useEffect(() => {
    if (!loginSelector) navigate("/");
    setLoding(false);
  }, [loginSelector, navigate]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <HeaderFooter>
          <GraphList names={memoizedNames} />
        </HeaderFooter>
      )}
    </div>
  );
};
