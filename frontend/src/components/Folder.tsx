import React from "react";
import Box from "@material-ui/core/Box";
import { styled as materialStyled } from "@material-ui/core/styles";
import { PINK_COLOR } from "../colorConstants";

const NoteStyle = materialStyled(Box)({
  height: "80px",
  backgroundColor: PINK_COLOR,
  borderRadius: "5px"
});

interface Props {
  folderName: String;
}

const Folder = (props: Props) => {
  const { folderName } = props;

  return (
    <Box display="flex" flexDirection="row" mb={2} flexGrow={1}>
      <NoteStyle ml display="flex" flexDirection="row" flexGrow={1}>
        <Box p={1} mr={1} display="flex" alignItems="center">
          {folderName}
        </Box>
      </NoteStyle>
    </Box>
  );
};

export default Folder;
