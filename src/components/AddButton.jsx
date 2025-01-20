import * as React from "react";
import Popover from "@mui/material/Popover";
import NestedList from "./PopoverContent";
import Button from "@mui/material/Button";

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} style={{backgroundColor: "#514EF3", color: "white"}} onClick={handleClick}>
        Add New +
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <NestedList />
      </Popover>
    </div>
  );
}
