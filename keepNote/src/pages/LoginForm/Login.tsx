import { JSX } from "@emotion/react/jsx-runtime";
import {Typography,TextField, Paper, Box, Button, Alert} from "@mui/material";
import  { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { User } from "../../types/User";
import AuthContext from "../../context/AuthContext";

interface LoginFormInputs{
    email : string;
    password: string;
}


export default function Login():JSX.Element{
    const {
        register,handleSubmit,formState: {errors}
    } = useForm<LoginFormInputs>();

    const [errorMsg,setErrorMsg]= useState("");
    const navigate = useNavigate();
    const [url,setUrl] = useState<string>("");
    const {data:users}= useFetch<User[]>(url);

    const {login} = useContext(AuthContext)!;

   const onSubmit = async (data:LoginFormInputs)=>{
    setErrorMsg("");
    setUrl(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`
    );
   }

   useEffect(()=>{
    if(users && users.length >0){
        const user = users[0];
        localStorage.setItem("userId",String(user.id))
        login();
        console.log("Login success:",user);
    }else if(users && users.length === 0){
        setErrorMsg("Invalid email or password");
    }
   },[users,navigate,login]);

    return (
        <Box sx={{
            display:"flex",
            justifyContent:"center",
            alignItems :"center",
            minHeight:"70vh",
          }}>
            <Paper elevation={4} sx={{p:4,maxWidth: 400 ,width: "100%"}}>
                <form 
                style={{
                    display:"flex",
                    flexDirection:"column",
                    gap: "1.5em",
                    padding: "20px 30px",
                }}
                onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" component="div" align="center" sx={{fontWeight:"bold"}}>
                    Login to KeepNote
                </Typography>
                {errorMsg && (
                    <Alert severity="error" sx={{mb:2}}>
                        {errorMsg}
                    </Alert>
                )}
                <TextField 
                label="Email"
                fullWidth
                {...register("email",{required:"Email is required"})}
                error={!!errors.email}
                helperText={errors.email?.message}
                />

                <TextField 
                label="Password"
                fullWidth
                {...register("password",{required:"Password is required"})}
                error={!!errors.password}
                helperText={errors.password?.message}
                />

                <Button
                 type="submit"
                 sx={{
                 bgcolor: "#fbc02d",
                 "&:hover": { bgcolor: "#f9a825" },
                  }}
                variant="contained"
                >
                Login
                </Button>

            </form>

            <Typography variant="body2" align="center">
              New user?{" "}
              <Link to= "/register">Sign up here</Link>
            </Typography>
            </Paper>
        </Box>
    )
}