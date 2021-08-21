import React, {useEffect ,useState, useContext} from 'react'
import UserContext from '../userContext';

function Activity() {
    const {user} = useContext(UserContext);
    const [updatedActivity, setUpdatedActivity] = useState([])

    useEffect(()=>{
        fetch('http://localhost:4000/api/users/profile',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
        .then(data => {
            setUpdatedActivity(data)
            
        })
    }, [updatedActivity])

    let date = updatedActivity.updatedAt
    
    return (
        <div>
            <h2>Updated profile</h2>
            <h3>{date}</h3>
        </div>
    )
}

export default Activity
