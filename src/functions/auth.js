import axios from "axios";

export const loginAndAddUser=async(user)=>{  
    return await axios({
        method: "post",
        url: `${process.env.REACT_APP_API}/login`,
        data: { name: user.name, email: user.email },
        headers: { "Content-Type": "application/json" },
    });
}