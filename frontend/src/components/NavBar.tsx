import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';

import './NavBar.css';
import ListItemButton from '@mui/material/ListItemButton';
import logo from '../images/officialLogo.png';
import { logout } from '../login/loginFunctions';
import responsiveStyles from '../functions/responsive';

export default function NavBar(props: any) {
  const styles = responsiveStyles();
  const { isOpen, setIsOpen } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const navigate = useNavigate();

  const toggle = () => {
    setIsOpen(!isOpen);
    setAnchorEl(null);
  };

  const handleMouseEnter = () => {
    setIsLogoutHovered(true);
  };

  const handleMouseLeave = () => {
    setIsLogoutHovered(false);
  };

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const buttonStyle = {
    textDecoration: 'none',
    marginTop: isOpen ? '10px' : '30px',
    paddingLeft: '4px',
    paddingRight: '4px',
    display: 'block',
    color: 'white',
    transition: 'left 0.5s',
    '&:hover': {
      background: 'rgb(37, 92, 255)',
      color: 'white',
      transition: 'all 0.5s',
      boxShadow: '0px 0px 1px 1px black',
    },
  };

  const links = [
    {
      text: 'DASHBOARD',
      icon: <DashboardIcon style={{ color: 'white' }} />,
      path: '/dashboard',
    },
    {
      text: 'PRODUCTS',
      icon: <InventoryIcon style={{ color: 'white' }} />,
      path: '/products',
    },
    {
      text: 'PRODUCT LOGS',
      icon: <ContentPasteIcon style={{ color: 'white' }} />,
      path: '/product-logs',
    },
    {
      text: 'CUSTOMERS',
      icon: <RecentActorsIcon style={{ color: 'white' }} />,
      path: '/customers',
    },
    {
      text: 'SUPPLIERS',
      icon: <PersonSearchIcon style={{ color: 'white' }} />,
      path: '/suppliers',
    },
    {
      text: 'USER ACTIONS',
      icon: <AccountCircleIcon style={{ color: 'white' }} />,
      path: '/user-actions',
    },
  ];

  return (
    <div>
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            height: '100%',
            width: styles.navBarWidth(isOpen),
            backgroundColor: 'rgba(7, 42, 104, 1)',
            alignItems: 'center',
            overflowX: 'hidden',
          },
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            height: isOpen ? '8em' : '3em',
            width: isOpen ? '8em' : '3em',
            marginTop: isOpen ? 15 : 10,
            marginBottom: isOpen ? 0 : 10,
          }}
        />
        <Button
          className="menu"
          sx={{
            ':hover': { backgroundColor: 'white', color: 'black' },
            color: 'white',
          }}
          style={{
            marginLeft: isOpen ? '130px' : '0px',
          }}
          onClick={toggle}
        >
          {isOpen ? <ArrowCircleLeftIcon /> : <ArrowCircleRightIcon />}
        </Button>

        <List>
          {links.map((link) => {
            const { text, icon, path } = link;
            return (
              <Link
                key={text}
                to={path}
                style={{
                  textDecoration: 'none',
                  marginTop: isOpen ? '10px' : '30px',
                }}
                className="link"
              >
                <ListItemButton key={text}>
                  {icon && (
                    <ListItemIcon
                      style={{
                        justifyContent: 'center',
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                  )}
                  <ListItemText
                    primaryTypographyProps={{
                      style: {
                        fontSize: styles.navBarTextSize,
                        fontWeight: 'bold',
                        display: isOpen ? 'block' : 'none',
                        fontFamily: 'inherit',
                        paddingLeft: '10px',
                      },
                    }}
                    primary={text}
                  />
                </ListItemButton>
              </Link>
            );
          })}
          <ListItemButton
            key="PROFILE"
            onClick={handleMenuOpen}
            // sx={buttonStyle}
            sx={{
              ...buttonStyle,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 2.5,
            }}
          >
            <ListItemIcon
              style={{
                justifyContent: 'center',
              }}
            >
              <SettingsIcon style={{ color: 'white' }} />
            </ListItemIcon>

            <ListItemText
              primaryTypographyProps={{
                style: {
                  fontSize: styles.navBarTextSize,
                  fontWeight: 'bold',
                  display: isOpen ? 'block' : 'none',
                  fontFamily: 'inherit', // Add the same font family as other links
                  paddingLeft: '10px', // Adjust the left padding as per your requirement
                },
              }}
              primary="PROFILE"
            />
          </ListItemButton>
        </List>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 10,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,

              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: '77%',
                left: '-5px',
                width: 10,
                height: 10,
                bgcolor: isLogoutHovered
                  ? 'rgb(37, 92, 255)'
                  : 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          sx={{
            ml: isOpen ? 20 : 9,
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem sx={{ fontSize: 20 }}>
            User: {localStorage.getItem('username')}
          </MenuItem>
          <MenuItem sx={{ fontSize: 20 }}>
            Permission Type:&nbsp;
            {localStorage.getItem('admin') === 'true' ? 'ADMIN' : 'VIEW-ONLY'}
          </MenuItem>
          <MenuItem
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundColor: isLogoutHovered ? 'rgb(37, 92, 255)' : 'white',
              color: isLogoutHovered ? 'white' : 'black',
              fontSize: 20,
            }}
            onClick={handleLogout}
          >
            <LogoutIcon />
            &nbsp;Logout
          </MenuItem>
        </Menu>
      </Drawer>
    </div>
  );
}
