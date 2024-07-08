import {
  Box,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  Typography,
  ListItemButton,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getWritetimeList } from "../../data/data";
import { calculTime, getToday } from "../../controller/modalController";
import dayjs from "dayjs";
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
  const calDate = useRef<string[]>(calculTime(writetime, 0, 1, "YYYY-MM-DD", "days"))
  const listEndRef = useRef<HTMLLIElement>(null);
  const [items, setItems] = useState<JSX.Element[] | undefined>();
  
  useEffect(() => {
    const getList = async () => {
      const result = await getWritetimeList(eq, writetime, calDate.current[1]);
      console.log('calDate.current ',calDate.current)
      setList(result);
    };
    
    if (today.current != writetime) {
      today.current = writetime
      calDate.current = calculTime(writetime, 0, 1, "YYYY-MM-DD", "days")      
    }

    getList();
  }, [writetime]);

  useEffect(() => {
    const addNewArrWritetime = async () => {
      const lastItem = list.length > 0 ?  list[list.length - 1] : undefined;
      if (lastItem) {
        const { writetime } = lastItem;
        const result = await getWritetimeList(eq, writetime, calDate.current[1]);        
        if (result) {
          if (!result.includes("result")) {
            setList((prevList) => [...prevList, ...result]);
          }
        }
      }else {
        const result = await getWritetimeList(eq, writetime, calDate.current[1]);        
        if (result) {
          if (!result.includes("result")) {
            setList(result);
          }
        }
      }
    };
    if (today.current == writetime) {
      addNewArrWritetime();
    }
  }, [todayArrCountSelector,list]);

  const selectedColor = (index: number, box = false) =>
    `${id == `${index + 1}` ? "#5388F7" : (box ? "black" : "#c3c1c1")}`;

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


