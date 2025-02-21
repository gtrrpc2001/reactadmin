import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { comboBoxAction } from "../../createslice/createslices";
import { RootState } from "../../../store/store";
import { useTranslation } from "react-i18next";

export const Combobox = () => {
  const dispatch = useDispatch();
  const [t, _i18n] = useTranslation();
  const url = useSelector<RootState, string>((state) => state.comboBoxSelected);
  const handleUrlChange = (newValue: string | null) => {
    dispatch(comboBoxAction.value(newValue || "deploy"));
  };

  return (
    <Autocomplete
      id="url-select"
      sx={{
        marginLeft: 2,
        width: 200,
        "& #url-select": {
          cursor: "pointer",
        },
      }}
      onChange={(_, value) => handleUrlChange(value)}
      autoHighlight
      disableClearable
      options={["test", "deploy"]}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ cursor: "pointer" }}
          label={t("URL Select")}
          onKeyDown={(event) => {
            if (event.key === "Backspace") {
              event.preventDefault();
            }
          }}
        />
      )}
      defaultValue={url ? url : "deploy"}
    />
  );
};
