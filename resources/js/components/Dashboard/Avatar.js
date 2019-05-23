import React, { Component } from "react";
import { Avatar as Antd_Avatar } from "antd";

const Avatar = (props) => {
    return (
        <div>
            {console.log(props)}
            <Antd_Avatar
                style={{ width: 100, height: 100, borderRadius: '50%' }}
                className="profilepic"
                src={props.avatar ? `/storage/user-avatars` + props.avatar : `/images/avatar.svg`}
            />
        </div>
    );
}

export default Avatar