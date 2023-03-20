import React from 'react'
import { Box,AppBar,Toolbar,IconButton,Typography,Button, Stack } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const Header = () => {

  // eslint-disable-next-line
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <Box my={1} sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          style={{borderRadius:'0'}}
        >
          {/* <MenuIcon /> */}
          <img src={process.env.PUBLIC_URL+'/images/icon.png'} alt='icon'style={{width:'50px'}}></img>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Wheelz
            </Typography>
        </IconButton>
       <Stack sx={{ flexGrow: 1 }}></Stack>
        <Button color="inherit">Login</Button>
        
        {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>)}

      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header