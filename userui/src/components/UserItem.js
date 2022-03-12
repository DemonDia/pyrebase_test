import React from 'react';

const UserItem = (props) => {
    // console.log(props.user)
    return (
        <div>
            <h2>
                {props.user}
            </h2>
            
        </div>
    );
};

export default UserItem;