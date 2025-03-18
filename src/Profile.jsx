import React from 'react'
import {useLocation} from 'react-router-dom'

const Profile = () => {
    const location = useLocation();
    const { name, email } = location.state || {}; //if location.state is undefined, it becomes an empty object.
    
  return (
    <div>
        <h5>
            welcome {name}
        </h5>
    </div>
  )
}

export default Profile