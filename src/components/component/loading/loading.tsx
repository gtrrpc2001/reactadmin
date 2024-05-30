import React, { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
  display: "flex",
  marginLeft: "45%",
  marginTop: "17%",
  borderColor: "#E50915",
  textAlign: "center",
};

export const Loading = ({ loading }: any) => {
  return (
    <div>
      <ClipLoader
        color="#E50915"
        loading={loading}
        cssOverride={override}
        size={150}
      >
        *
      </ClipLoader>
    </div>
  );
};
