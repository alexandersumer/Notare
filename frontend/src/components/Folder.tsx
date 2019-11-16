import React from "react";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

interface Props {
  category: String;
}

const Folder = (props: Props) => {
  const { category } = props;

  return (
    <Link to={`/CategoryVideos/${category}`}>
      <Box display="flex" flexDirection="row" mb={2} flexGrow={1}>
        <Box p={1} mr={1} display="flex" alignItems="center">
          {category}
        </Box>
      </Box>
    </Link>
  );
};

export default Folder;
