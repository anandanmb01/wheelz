import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Stack } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CartIcon() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleHover = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { cart } = React.useContext(CartContext);

  const navigate = useNavigate();
  const CartItem = () => {
    let out = [];
    if (cart !== {}){
    for (let [key, value] of Object.entries(cart)) {
      out.push(
        <MenuItem onClick={handleClose} key={key}>
          <Stack
            direction={"row"}
            display={"flex"}
            justifyContent={"space-around"}
          >
            <Box
              component={"img"}
              src={value.imgUrl[`${value.order.color}`]}
              alt=""
              height={"40px"}
            ></Box>
            {`${value.name}`}
          </Stack>
        </MenuItem>
      );
    }}
    else{
      out.push(<MenuItem onClick={handleClose} key={0}>Cart empty</MenuItem>)
    }
    return out;
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        sx={{ mr: 2 }}
        onClick={() => {
          navigate("/cart");
        }}
        // onMouseOver={handleHover}
        // onMouseLeave={()=>{setTimeout(()=>{setAnchorEl(null)},2000);}}

      >
        <StyledBadge badgeContent={Object.keys(cart).length} color="secondary">
          <ShoppingCartIcon sx={{ width: 32, height: 32 }} />
        </StyledBadge>
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <CartItem />
      </Menu>
    </>
  );
}
