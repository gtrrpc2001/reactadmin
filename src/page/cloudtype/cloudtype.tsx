import { useQuery } from "@tanstack/react-query";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { getCloudTypeData } from "../../data/cloudtype";
import { CloudTypeData } from "../../axios/interface/cloudtype";
import { ProjectCard } from "../../components/component/cloudtype/card";
import "./cloudtype.scss";

export const CloudType = () => {
  const loginSelector = useSelector<RootState, boolean>((state) => state.check);
  const { data } = useQuery<CloudTypeData[], Error>({
    queryKey: ["CloudTypeData"],
    queryFn: async () => getCloudTypeData(),
    enabled: loginSelector,
    refetchInterval: loginSelector ? 2000 : false,
  });

  const handleConnect = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="cloudtype">
      {data?.map((d) => (
        <ProjectCard
          projectName={d.projectName}
          title={d.name}
          type={d.projectName.includes("react") ? "web" : "backend"}
          status={d.status}
          onConnect={() => {
            const linkIndex = d.projectName.includes("react") ? 1 : 0;
            const selectedLink = d.link[linkIndex];
            handleConnect(selectedLink);
          }}
        />
      ))}
    </div>
  );
};
