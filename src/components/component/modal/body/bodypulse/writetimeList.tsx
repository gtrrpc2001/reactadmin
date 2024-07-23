import {
  Box,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  Typography,
  ListItemButton,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getWritetimeList } from "../../data/data";
import { calculTime, getToday } from "../../controller/modalController";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import React from "react";

type Props = {
  writetime: string;
  id: string;
  list: any[];
  setList: React.Dispatch<React.SetStateAction<any[]>>;
  handler: (id: string) => void;
  eq: string;
};

export const WritetimeList = React.memo(function WritetimeList({
  writetime,
  id,
  list,
  setList,
  handler,
  eq,
}: Props) {
  const todayArrCountSelector = useSelector<RootState, number>(
    (state) => state.todayArrCount
  );

  const today = useRef<string>(getToday());  
  const calDate = useRef<string[]>(
    calculTime(writetime, 0, 1, "YYYY-MM-DD", "days")
  );
  const listEndRef = useRef<HTMLLIElement>(null);
  const [items, setItems] = useState<JSX.Element[] | undefined>();

  const getList = async () => {
    const result = await getWritetimeList(eq, writetime, calDate.current[1]);
    setList(result);
    console.log('writetime : ',writetime,' calDate.current[1] : ',calDate.current[1], ' result : ', result, ' list : ',list)
  };

  // useEffect(() => {
  //   const updateToday = async () => {
  //     const newToday = getToday();
  //     if (today.current !== newToday) {
  //       today.current = newToday;
  //       await getList();
  //     }      
  //   };

  //   const intervalId = setInterval(updateToday, 60000);

  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    if (today.current != writetime) {
      today.current = writetime;
      calDate.current = calculTime(writetime, 0, 1, "YYYY-MM-DD", "days");
    }

    getList();
  }, [writetime]);

  useEffect(() => {
    const addResult = async (writetime: string,newCheck:boolean = false) => {
      const result = await getWritetimeList(eq, writetime, calDate.current[1]);      
      if (!result.includes("result")) {
        if(!newCheck){
          setList((prevList) => {
            return [...prevList,...result];
          });
        }else{
          setList(result)
        }
      }else{
        return result
      }
    };

    const addNewArrWritetime = async () => {
      const lastItem = list?.length > 0 ? list[list.length - 1] : today.current;      
      if (lastItem) {
        if (list.length > 0) {
          const { writetime } = lastItem;          
          await addResult(writetime);
        } else {
          await addResult(lastItem,true);
        }
      }
    };
    addNewArrWritetime();
  }, [todayArrCountSelector]);

  const selectedColor = useCallback(
    (index: number, box = false) =>
      `${id === `${index + 1}` ? "#5388F7" : box ? "black" : "#c3c1c1"}`,
    [id]
  );

  useEffect(() => {
    const itemes = () => {
      try {
        return list?.map((value, index) => {
          const { writetime, address } = value;
          return (
            <ListItem
              className="listItem"
              id={`${index + 1}`}
              key={`${index + 1}`}
              onClick={(e) => handler(e.currentTarget.id)}
              ref={index == list.length - 1 ? listEndRef : null}
            >
              <ListItemButton sx={{ padding: 0 }}>
                <ListItemIcon>
                  <Box
                    sx={{
                      width: 45,
                      height: 40,
                      borderRadius: 3,
                      bgcolor: selectedColor(index, true),
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      ":hover": { cursor: "default" },
                    }}
                  >
                    <Typography sx={{ color: "white" }}>
                      {address == null ? index + 1 : "E"}
                    </Typography>
                  </Box>
                </ListItemIcon>
                <ListItemText
                  className="text"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: 1,
                    borderRadius: 3,
                    borderColor: selectedColor(index),
                    height: 40,
                    ":hover": { cursor: "pointer" },
                  }}
                  primary={writetime}
                />
              </ListItemButton>
            </ListItem>
          );
        });
      } catch {}
    };

    setItems(itemes());
  }, [list, id]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (listEndRef.current) {
        listEndRef.current.scrollIntoView({ behavior: "smooth" });
        listEndRef.current.click();
      }
    };

    scrollToBottom();
  }, [items?.length]);

  return (
    <Box sx={{ height: 250, width: 350, bgcolor: "background.paper" }}>
      <List sx={{ maxHeight: 250, overflow: "auto" }}>{items}</List>
    </Box>
  );
});
