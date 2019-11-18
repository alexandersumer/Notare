import * as React from "react";
import Box from "@material-ui/core/Box";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import { styled as materialStyled } from "@material-ui/core/styles";

interface Props {
  onAdd: any;
}

interface State {
  addMode: boolean;
  textValue: string;
}

const MyIconButton = materialStyled(IconButton)({
  padding: 2
});

export default class Search extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      addMode: false,
      textValue: "",
    };
  }
  
  onToggleAddMode(e: any) {
    this.setState((state: State) => ({
      addMode: !state.addMode,
    }));
  }

  onHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ textValue: event.target.value });
  }

  onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode == 13 && event.shiftKey == false) {
      event.preventDefault();
      // Only add notes with more than just spaces
      if (this.state.textValue.trim().length) {
        this.props.onAdd(this.state.textValue);
      }
      this.setState({ addMode: false });
    }

    // on escape key, cancel edit
    if (event.keyCode == 27) {
      this.setState({ addMode: false });
    }
    
  }

  render(){
    const { addMode } = this.state;
    if (addMode) return (
      <Badge variant="info"><Box >
      <input type="text" 
        onChange={this.onHandleChange.bind(this)} 
        onKeyDown={this.onKeyDown.bind(this)}
        onBlur={this.onToggleAddMode.bind(this)}/>
      <MyIconButton aria-label="cancel" onClick={this.onToggleAddMode.bind(this)}>
        <ClearIcon fontSize="small" />
      </MyIconButton>
    </Box></Badge>
    )
    return (<Button size="sm" variant="info" onClick={this.onToggleAddMode.bind(this)}>+ add new category</Button>) 
  }

}
