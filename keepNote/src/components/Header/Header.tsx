import { useContext, useState, type JSX, type ReactNode } from "react";
import {AppBar,Toolbar,Typography,Box, IconButton, Menu, MenuItem} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {  Home, Menu as MenuIcon, Login } from "@mui/icons-material";
import Person from "@mui/icons-material/Person";
import AuthContext from "../../context/AuthContext";
import Logout from "@mui/icons-material/Logout";


type HeaderProps = {
  children?: ReactNode;
};

export default function Header({ children }: HeaderProps):JSX.Element{
const [mobileOpen,setMobileOpen]= useState(false);
const navigate = useNavigate();
const {isLoggedIn,logout}= useContext(AuthContext)!;

const navigateToHome = ()=> navigate(isLoggedIn ? "/home":"/");

const handleMobileMenuOpen =()=>{
  setMobileOpen(true);
}

const handleMobileMenuClose=()=>{
  setMobileOpen(false);
}

return(
     <AppBar position="static" 
        sx={{ 
            backgroundColor: "black",
            padding: "12px 5px",
            }}>
      <Toolbar sx={{ 
        display: "flex", justifyContent:"space-between",alignItems:"center" ,
        flexWrap: "wrap" 
        }}>
         <Typography 
         variant = "h3" 
         sx ={{fontFamily: '"Protest Guerrilla", serif',
         color:"aqua",
         letterSpacing:"2px",  
         display: { xs: isLoggedIn?"none":"block", md: "block" },      
         }}>
          KeepNote
          </Typography>

         <Box>{children}</Box>

         {/* Mobile Menu Button */}
         <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
          size="large"
          aria-label="Menu"
          color="inherit"
          onClick={handleMobileMenuOpen}
          sx={{ minWidth: "100px" }}
          >
            <MenuIcon />
          </IconButton>
         </Box>


          {/* Desktop Icons */}

          {isLoggedIn && (
         <Box sx={{
          display:{xs: "none",md:"flex",alignItems:"center"}
         }}>
           <IconButton 
            size="large" 
            aria-label="Home" 
            sx={{ color: "white" }}
            onClick={navigateToHome}
          >
            <Home />
          </IconButton>
          
              <Link to="/profile">
            <IconButton
              size="large"
              aria-label="Account"
              sx={{ color: "white" }}
            >
              <Person />
            </IconButton>
          </Link>
          
          
          {isLoggedIn ? (
             <IconButton
              size="large"
              aria-label="Login"
              sx={{ color: "white" }}
              onClick={() => logout()}
            >
              <Logout />LOGOUT
            </IconButton>

          ):(
             <IconButton
             size="large"
             aria-label="Login"
             sx={{ color: "white" }}
             onClick={navigateToHome}
             >
              <Login/>LOGIN
             </IconButton>
          )
          }
         </Box>
          )}

         {/* Mobile Menu */}
         {isLoggedIn && (
        <Menu
         open={mobileOpen}
         onClose={handleMobileMenuClose}
         sx={{display: {xs: "flex",md:"none"}}}
         anchorOrigin={{
          vertical: "top",
          horizontal:"right"
         }}
         >
          <MenuItem
          onClick={()=>{
            handleMobileMenuClose();
          }}
          >
            <Link to="/home">
             <IconButton size="large" aria-label="Home" color="inherit">
              <Home />
             </IconButton>
            </Link>
          </MenuItem>

          <MenuItem
           onClick={()=>{
            handleMobileMenuClose();
          }}
          >
            <Link to ="/profile">
              <IconButton size="large" aria-label="Profile" color="inherit">
                <Person />
              </IconButton>
            </Link>
          </MenuItem>

         <MenuItem
          onClick={()=>{handleMobileMenuClose()}}
         >
         {isLoggedIn ? (
              <IconButton
                size="large"
                aria-label="Login"
                 color="inherit" 
                onClick={() => logout()}
              >
                <Logout />LOGOUT
              </IconButton>
            ) : (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                color= "inherit"
                onClick={navigateToHome}
              >
                <Login />LOGIN
              </IconButton>
            )}

         </MenuItem>
        </Menu> 
        )}
      </Toolbar>
    </AppBar>
)
}



