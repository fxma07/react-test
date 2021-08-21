import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Swal from "sweetalert2";


export default function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState([]);



    useEffect(()=>{
        fetch('http://localhost:4000/api/users/profile',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
        .then(data => {
            setUserInfo(data)
            
        })
    }, [userInfo])

    let defaultFirstName = userInfo.firstName
    let defaultLastName = userInfo.lastName
    let defaultEmail = userInfo.email

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function updateUserProfile(e) {
    e.preventDefault();

    fetch("http://localhost:4000/api/users/update-profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.err) {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: data.err,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Profile Updated",
          });
        }
      });
    setFirstName("");
    setLastName("");
    setEmail("");
  }

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
        <form onSubmit={(e) => updateUserProfile(e)}>
          <DialogContent>

            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label={defaultFirstName}
              type="text"
              fullWidth
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}

            />
            <TextField
              autoFocus
              margin="dense"
              id="lastName"
              label={defaultLastName}
              type="text"
              fullWidth
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label={defaultEmail}
              type="email"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              
            />
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            
            <Button type="submit" color="primary" onClick={handleClose}>
              Submit
            </Button>
          
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
