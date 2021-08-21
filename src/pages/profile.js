import React, {useEffect ,useState, useContext} from 'react'
import UserContext from '../userContext'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EditProfile from '../components/EditProfile';
import RenderCropper from '../components/cropper/cropper';
import RenderAvatar from '../components/avatar/avatar';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      flexGrow: 1,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    info: {
        marginBottom: 12
    }
  });

  
function Profile() {
    const {user} = useContext(UserContext);
    const [userInfo, setUserInfo] = useState([]);
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    useEffect(()=>{
        fetch('https://calm-retreat-45188.herokuapp.com/api/users/profile',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
        .then(data => {
            setUserInfo(data)
            
        })
    }, [userInfo])

    let firstName = userInfo.firstName
    let lastName = userInfo.lastName
    let email = userInfo.email
        
        
      
    return (
    
  <>
  <Grid className={classes.root} spacing={1} container direction="row" justifyContent="space-evenly">
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Name
        </Typography>
        <Typography variant="h5" component="h2" className={classes.info}>
          {firstName} {lastName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Email
        </Typography>
        <Typography variant="h5" className={classes.info} component="p">
          {email}
        </Typography>
      </CardContent>
      <CardActions> 
        <EditProfile/>       
      </CardActions>
    </Card>
   
     
      <RenderAvatar/>
    
  
    </Grid>
   
   
    
        </>
     
    
    )
}

export default Profile
