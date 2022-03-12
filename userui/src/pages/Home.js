import React, {useEffect,useState} from 'react';
import axios from 'axios';
import UserItem from '../components/UserItem';
function Home() {
    function getUserData(){
        axios.get("http://127.0.0.1:5000/users").then(
            res => {
                console.log(res.data)
            }
        )
    }
    const [users,getUsers] = useState([])
    useEffect(()=>{
        getUserData()
    }
    ,[])
    return (
        <div>
            {users}
            
        </div>
    );
}

export default Home;