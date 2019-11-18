import React from "react";
import Box from "@material-ui/core/Box";

import Button from "react-bootstrap/Button";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

interface Props {
  category: string;
  selected: boolean;
  deleteMode: boolean;
  onSelectCategory: (category: string) => void;
  onDeselectCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
}

const getVariant = (selected: boolean, deleteMode: boolean) => {
  if (deleteMode) return "danger";
  return selected ? "secondary" : "light";
};

const CategoryLabel = (props: Props) => {
  const {
    category,
    selected,
    onSelectCategory,
    onDeleteCategory,
    onDeselectCategory,
    deleteMode
  } = props;

  const handleClick = (e: any) => {
    props.selected ? onDeselectCategory(category) : onSelectCategory(category);
  };

  const handleDelete = (e: any) => {
    onDeleteCategory(category);
  };

  const variant = getVariant(selected, deleteMode);
  return (
    <Box p={0.5} mr={0.5}>
      <Button variant={variant} size="sm" onClick={handleClick}>
        {category}
        {deleteMode && (
          <DeleteOutlineIcon onClick={handleDelete} fontSize="small" />
        )}
      </Button>
    </Box>
  );
};

export default CategoryLabel;
