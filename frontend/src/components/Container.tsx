import { styled as materialStyled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const MARGIN_SIZE = 150;
const Container = materialStyled(Box)({
  marginLeft: MARGIN_SIZE,
  marginRight: MARGIN_SIZE,
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

export default Container;
