import React, { useState, useEffect, useContext} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Swal from "sweetalert2";
import UserContext from '../userContext.js'
import {Redirect} from 'react-router-dom'

export default function Login() {
  const {user, setUser}= useContext(UserContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [isActive, setIsActive] = useState(false);
  const [willRedirect, setWillRedirect] = useState(false);

  useEffect(() => {
    if (
      
      email !== "" &&
      password !== ""
      
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function loginUser(e) {
    e.preventDefault();

    fetch("https://calm-retreat-45188.herokuapp.com/api/users/login", 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.message) {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: data.message,
          });
        } else {
            localStorage.setItem('token', data.accessToken)

            fetch('https://calm-retreat-45188.herokuapp.com/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${data.accessToken}`
                }
            })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('email', data.email)

                setUser({
                    email: data.email,
                    
                })
                
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Welcome",
                  });
            })
            setWillRedirect(true)
        }
      })
    setEmail("");
    setPassword("");
  }

  return (
      user.email|| willRedirect
      ?  
      <Redirect to='/profile'/>
      :
      <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <form onSubmit={(e) => loginUser(e)}>
          <DialogContent>
            <DialogContentText>
              
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {
            isActive
            ?<Button type="submit" color="primary" onClick={handleClose}>
              Login
            </Button>
            :
            <Button type="submit" color="primary" onClick={handleClose} disabled>
              Login
            </Button>
            }
          </DialogActions>
        </form>
      </Dialog>
    </div>
     
     
   
  );
}
