import React,{useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Register from "./Register";
import Login from "./Login";
import UserContext from "../userContext";
import Button from '@material-ui/core/Button'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const {user, unsetUser, setUser} = useContext(UserContext)
  const classes = useStyles();

  function logout(){
    unsetUser()

    setUser({
        email: null,
        isAdmin: null
    })

    window.location.replace('/');
}
  return (
    user.email
    ?
    <div className={classes.root}>
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Dorxata
        </Typography>

        <Button type="submit"  color="inherit" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
    </div>
    
    :
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dorxata
          </Typography>
            <Login /> 
            <Register /> 
        </Toolbar>
      </AppBar>
    </div>
  );
}
