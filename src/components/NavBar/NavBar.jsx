import { Link } from "react-router-dom"
import * as userService from "../../utilities/users-service"
import { useState } from "react";
import { Favorite as FavoriteIcon, Home as HomeIcon, ExpandMore as ExpandMoreIcon, MoreVert as MoreVertIcon, Link as LinkIcon, Accessible as AccessibleIcon } from "@mui/icons-material";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';


export default function NavBar({ user, setUser, events, savedYelpData }) {
  const savedEventCount = (events?.length ?? 0) + (savedYelpData?.length ?? 0);
  // console.log(events.length, savedYelpData.length)

  const userName = user?.name.charAt(0).toUpperCase() + user?.name.slice(1)
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}></MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem onClick={handleMenuClose}>

        <Link to="" onClick={handleLogOut} >Log Out</Link></MenuItem>
    </Menu>
  );


  const renderSignInMenu =
    (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}></MenuItem>
        {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
        <MenuItem onClick={handleMenuClose}>

          <Link to="/login" >Login</Link></MenuItem>
      </Menu>
    )


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="medium" color="inherit">
          <Badge badgeContent={savedEventCount} color="error" sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.6rem',
              padding: '0 3px'
            }
          }} >
            <Link to="/events/saved" className="custom-link" >  <FavoriteIcon /> </Link>

          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="small"
          aria-label="Home"
          color="inherit"
        >
          <Link to="/" className="custom-link"><HomeIcon /> Home</Link>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="small"
          aria-label="Home"
          color="inherit"
        >
          <Link to="/yelp" className="custom-link">Yelp</Link >
        </IconButton>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="small"
          aria-label="Home"
          color="inherit"
        >
          <Link to="/events/ticketmaster" className="custom-link" >Ticket Master</Link>
        </IconButton>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  return (

    <>

      {
        user ? (
          <>

            <Box sx={{ flexGrow: 1 }} className="NavBar" >
              <AppBar
                position="fixed"
                style={{
                  height: '75px', width: '100%',
                  top: "-1rem",
                  backgroundColor: "#6d98ba",
                  // borderRadius: "10px"

                }}

                className="NavBar"
              >
                <Toolbar>

                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                    style={{
                      borderRadius: "1px"
                    }}
                  >
                    <Link to="/" className="custom-link">
                      <img src="/logo.png" alt="App logo" className="navbar-logo" />
                    </Link>
                  </IconButton>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  >
                    <Link to="/" className="custom-link">

                      Date Night
                    </Link>
                  </Typography>

                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton size="large" aria-label="show new notifications" color="inherit"
                      style={{
                        borderRadius: "10px"
                      }} >
                      <Badge badgeContent={savedEventCount} color="error" sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '0.8rem',
                          padding: '0 3px'
                        }
                      }}
                      >
                        <Link to="/events/saved" className="custom-link" >  <FavoriteIcon /> </Link>

                      </Badge>
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="Home"
                      color="inherit"
                      style={{
                        borderRadius: "10px"
                      }}
                    >

                      <Link to="/" className="custom-link">Home</Link>

                    </IconButton>

                    <IconButton
                      size="small"
                      aria-label="Home"
                      color="inherit"
                      style={{
                        borderRadius: "10px"
                      }}
                    >
                      <Link to="/yelp" className="custom-link">Yelp</Link >
                    </IconButton>

                    <IconButton
                      size="small"
                      aria-label="Home"
                      color="inherit"
                      style={{
                        borderRadius: "10px"
                      }}
                    >

                      <Link to="/events/ticketmaster" className="custom-link" >Ticket Master</Link>

                    </IconButton>
                    <p style={{ padding: "10px" }}>Welcome {userName}! </p>
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                      style={{
                        borderRadius: "10px"
                      }}
                    >
                      <AccountCircle />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                  </Box>
                </Toolbar>
              </AppBar>
              {renderMobileMenu}
              {renderMenu}
            </Box>

          </>) :
          (



            <>


              <Box sx={{ flexGrow: 1 }} className="NavBar" >
                <AppBar
                  position="fixed"
                  style={{
                    height: '75px', width: '100%',
                    top: "-1rem",
                    backgroundColor: "#6d98ba",
                    // borderRadius: "10px"

                  }}

                  className="NavBar"
                >
                  <Toolbar>

                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      sx={{ mr: 2 }}
                      style={{
                        borderRadius: "1px"
                      }}
                    >
                      <Link to="/" className="custom-link">
                        <img src="/logo.png" alt="App logo" className="navbar-logo" />
                      </Link>
                    </IconButton>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                      <Link to="/" className="custom-link">

                        Date Night
                      </Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                      <IconButton size="large" aria-label="show new notifications" color="inherit"
                        style={{
                          borderRadius: "10px"
                        }} >

                        {
                          user ?
                            <>
                              <Badge badgeContent={savedEventCount} color="error" sx={{
                                '& .MuiBadge-badge': {
                                  fontSize: '0.8rem',
                                  padding: '0 3px'
                                }
                              }}
                              >
                                <Link to="/events/saved" className="custom-link" >  <FavoriteIcon /> </Link>
                              </Badge>
                            </>
                            :
                            <>
                              <Tooltip title="Login to view Saved Collections" placement="top">
                              <Link to="/login" className="custom-link" >  <FavoriteIcon /> </Link>
                            </Tooltip>
                      </>
                      }
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="Home"
                      color="inherit"
                      style={{
                        borderRadius: "10px"
                      }}
                    >

                      <Link to="/" className="custom-link">Home</Link>

                    </IconButton>

                    <IconButton
                      size="small"
                      aria-label="Home"
                      color="inherit"
                      style={{
                        borderRadius: "10px"
                      }}
                    >

                      <Link to="/events/ticketmaster" className="custom-link" >Ticket Master</Link>

                    </IconButton>


                    <IconButton
                      size="small"
                      aria-label="Home"
                      color="inherit"
                      style={{
                        borderRadius: "10px"
                      }}
                    >
                      <Link to="/yelp" className="custom-link">Yelp</Link >
                    </IconButton>


                    <p style={{ padding: "10px" }}> </p>
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                      style={{
                        borderRadius: "10px"
                      }}
                    >
                      <AccountCircle />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                  </Box>
                </Toolbar>
              </AppBar>
              {renderMobileMenu}
              {renderSignInMenu}
            </Box>
    </>
  )

}
    </>
  );

}

