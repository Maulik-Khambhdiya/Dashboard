import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PaidIcon from '@mui/icons-material/Paid';
import StarsIcon from '@mui/icons-material/Stars';
import { Button, Link } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

// pass the data using children

const Home = ({ children }) => {

  const icon = [<DashboardIcon sx={{ fontSize: "32px" }} />, <DeviceHubIcon sx={{ fontSize: "32px" }} />, <GroupAddIcon sx={{ fontSize: "32px" }} />, <StarsIcon sx={{ fontSize: "32px" }} />, <PaidIcon sx={{ fontSize: "32px" }} />]

  const arrayName = [{ name: "Dashboard", path: "/home" }, { name: "Class / Stream", path: "/streamclass" }, { name: "Student Details", path: "/add-student" }, { name: "Academic Performance", path: "/academyperformance" }, { name: "Fees Details", path: "feesdetails" }]

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar sx={{ backgroundColor: "#1976d2" }} />

      <Divider />

      <List>
        {arrayName.map((text, index) => (

          <Link href={text.path} sx={{ textDecoration: "none" }}>
            <ListItem key={text} disablePadding>

              <ListItemButton sx={{
                ":hover": {
                  backgroundColor: "#1976d2",
                  color: "white",

                  "& .MuiListItemIcon-root": {
                    color: "white",

                  }
                }
              }}>
                <ListItemIcon>
                  {icon[index]}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>

            </ListItem>
          </Link>
        ))}
      </List>

    </div>
  );



  return (
    <>

      <Box sx={{ display: 'flex' }}>

        <CssBaseline />

        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>

              <Box>
                <Link href="/home">
                  <Typography sx={{ color: "white" }} variant="h6" noWrap component="div">
                    Student Record Dashboard
                  </Typography>
                </Link>

              </Box>

              <Button

                sx={{
                  color:"white",
                   ":hover": {
                    backgroundColor: "ButtonShadow",
                    color: "black",
                    
                  }
                }}
              >
                <LogoutIcon></LogoutIcon>
              </Button>


            </Box>


          </Toolbar>

        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer

            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            slotProps={{
              root: {
                keepMounted: true, // Better open performance on mobile.
              },
            }}
          >
            {drawer}
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>

        </Box>

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          {children}
          {/* // get the data using children */}




        </Box>
      </Box>
    </>
  )
}

export default Home
