import { Box, IconButton } from "@mui/material";
import { GraphBody } from "./graphbody";
import AddIcon from "@mui/icons-material/Add";
import { ReactNode, useEffect, useRef, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import "./graphList.scss";

type Props = {
  names: { eq: string; eqname: string }[];
};

export const GraphList = ({ names }: Props) => {
  const deleteUserById = (id: string) => {
    setGraphUsers((prevUsers) => prevUsers.filter((node) => node.id !== id));
  };

  const [graphUsers, setGraphUsers] = useState<
    { id: string; node: ReactNode }[]
  >([]);
  const maxIdNumber = useRef(0);
  const addUser = () => {
    const id = `graph${maxIdNumber.current + 1}`;
    maxIdNumber.current += 1;
    setGraphUsers([
      ...graphUsers,
      {
        id: id,
        node: (
          <GraphBody
            key={id}
            graphId={id}
            onDelete={deleteUserById}
            names={names}
          />
        ),
      },
    ]);
  };

  const deleteUser = () => {
    setGraphUsers([...graphUsers].slice(0, -1));
  };

  useEffect(() => {
    if (!graphUsers.length) {
      const id = `graph${maxIdNumber.current + 1}`;
      maxIdNumber.current += 1;
      setGraphUsers([
        ...graphUsers,
        {
          id: id,
          node: (
            <GraphBody
              key={id}
              graphId={id}
              onDelete={deleteUserById}
              names={names}
            />
          ),
        },
      ]);
    }
  }, [graphUsers]);

  return (
    <div className="graphListBox">
      {graphUsers.map((item) => (
        <Box
          key={item.id}
          flexGrow={1}
          padding={`graph${graphUsers?.length}` !== item.id ? "3%" : ""}
        >
          {item.node}
        </Box>
      ))}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconButton size="large" onClick={addUser}>
          <AddIcon />
        </IconButton>
        <IconButton size="large" onClick={deleteUser}>
          <RemoveIcon />
        </IconButton>
      </Box>
    </div>
  );
};
