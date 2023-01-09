import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import fetchOne from '../fetchers/fetchOne';
import { useQuery } from 'react-query';


const Header = ({id, role, logOut}) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  

  const { isLoading, data, error } = useQuery("initials", () => 
    fetchOne(`http://localhost/dogs_store/server/api.php?table=users&id=${id}`), 
    {
      // The query will not execute until the userId exists
      enabled: !!id,
    }
  )

  if(isLoading) return <>Loading...</>
  console.log(data);

  return (
    <AppBar position="sticky" sx={{backgroundColor: "#7a9383"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              color: 'white',
              textDecoration: 'none',
            }}
          >
            <Link to='/' style={{textDecoration: "none", color:"black"}} >DoggyDeal.com</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{textDecoration: "none", color:"black"}} to={`/dogs`}>Dogs</Link> 
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{textDecoration: "none", color:"black"}} to={`/offer-dog`}>Offer A dog</Link> 
                  </Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to='/' style={{textDecoration: "none", color:"black"}} >DoggyDeal</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link style={{textDecoration: "none", color:"black", fontSize: "1.01rem"}} to={`/dogs`}>Dogs</Link> 
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                { id !== null ?
                  <Link style={{textDecoration: "none", color:"black", fontSize: "1.01rem"}} to={`/offer-dog`}>Offer Dogs</Link> 
                :
                <Link style={{textDecoration: "none", color:"black", fontSize: "1.01rem"}} to={`/login`}>Offer Dogs</Link>  }
              </Button>
          </Box>

          {id !== null ? <Box sx={{ flexGrow: 0}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: "orange" }}>
                  {data.name.slice(0,1) + data.surname.slice(0,1)}
              </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color:"black"}} to='/profile'>Profile</Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color:"black"}} to='/my-dogs'>My Dogs</Link>
                </Typography>
              </MenuItem>
              {role == 'admin' && 
               <>
               <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color:"black"}} to='/dashboard/dogs'>All Dogs</Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color:"black"}} to='/dashboard/breeds'>All Breeds</Link>
                </Typography>
              </MenuItem>
              </>
              }
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link style={{textDecoration: "none", color:"black"}} onClick={() => logOut()}>Log Out</Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box> :
           <>
            <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link style={{textDecoration: "none", color:"black", fontSize: "1.01rem"}} to={`/login`}>Login</Link> 
            </Button>
            <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link style={{textDecoration: "none", color:"black", fontSize: "1.01rem"}} to={`/register`}>Register</Link> 
            </Button>
           </>
           }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;