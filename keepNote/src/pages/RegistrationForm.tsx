import { JSX, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {Box,Paper,Typography,TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Snackbar, Alert} from "@mui/material";
import axios from "axios";
import {User} from '../types/User';
import { useNavigate } from "react-router-dom";

type RegistrationInputs = User & {
  confirmPassword: string
}


export default function RegistrationForm() :JSX.Element{

    const {control,getValues,watch,trigger,handleSubmit,formState:{errors}}=useForm<RegistrationInputs>({
        defaultValues: {
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
            gender:"",
            age:0,
            phoneNumber:"",
            street:"",
            city:"",
            state:"",
            zipCode:"",
        },
        mode: "onBlur"
    })
    
    const [step,setStep]=useState(1);
    const values = getValues();
    const navigate = useNavigate();

    const handleBack = () => setStep((prev) => prev - 1);
    const handleNext = () => setStep((prev) => prev + 1);

    const isStep1Valid = watch("firstName") && watch("lastName") && 
    watch("email") && 
    watch("password") && 
    watch("confirmPassword") &&
    !errors.firstName &&
    !errors.lastName &&
    !errors.email && 
    !errors.password && 
    !errors.confirmPassword;

    const isStep2Valid = watch("gender") &&
    watch("age") && 
    watch("phoneNumber") && 
    watch("street") && 
    watch("city") &&
    watch("state") &&
    watch("zipCode") &&
    !errors.gender &&
    !errors.age &&
    !errors.phoneNumber && 
    !errors.street && 
    !errors.city
    !errors.state && 
    !errors.zipCode;

    // Snackbar state
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({
    open: false,
    type: "success",
    message: "",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };


    const onSubmit = async (data:RegistrationInputs)=>{
      const {confirmPassword,...userData}=data;

      try{
        const response=await axios.post("http://localhost:3000/users",userData);
        setSnackbar({
        open: true,
        type: "success",
        message: "Registration successful!",
      });
      console.log("Registration success:",response.data)
      if(response.status === 201){
        navigate("/login");
      }
      }catch(error){
        setSnackbar({
        open: true,
        type: "error",
        message: "Failed to register. Please try again.",
      });

      }
    }

    const onErrors =()=>{
      console.log("handleSubmit called. Validation errors detected by RHF.");
      
      setSnackbar({
        open: true,
        type: "error",
        message: "Validation failed! Please go back to previous steps and correct the errors.",
    });


    }

    return(
        <Box
          sx={{
            display:"flex",
            justifyContent:"center",
            alignItems :"center",
            minHeight:"100vh",
            backgroundColor: "#f0e9d6" ,
            py:4
          }}
        >
            <Paper elevation={4} sx={{p:4,maxWidth: 600 ,width: "100%",borderRadius:3}}>
                <form onSubmit={handleSubmit(onSubmit,onErrors)}>
                    <Box sx={{display: step===1?'block':'none'}}>
                        <Typography variant="h5" align="center" gutterBottom sx={{fontWeight:"bold"}}>Registration Process</Typography>
                        <Controller
                          name="firstName"
                          control={control}
                          rules={{
                            required:"First name is required",

                            minLength:{
                              value:3,
                              message:"Minimum 3 characters required"
                            },

                            pattern:{
                              value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                              message: "Only alphabets are allowed"
                            }
                          }}
                          render={({field})=>(
                            <TextField
                               {...field}
                               label="First Name"
                               error={!!errors.firstName}
                               helperText={errors.firstName?.message}
                               fullWidth
                               margin="normal"
                            />
                          )}
                        />
                        <Controller
                          name="lastName"
                          control={control}
                          rules={{
                            minLength:{
                              value:3,
                              message:"Minimum 3 characters required"
                            },

                            pattern:{
                              value:/^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                              message: "Only alphabets are allowed"
                            }
                          }}
                          render={({field})=>(
                            <TextField
                               {...field}
                               label="Last Name"
                               error={!!errors.lastName}
                               helperText={errors.lastName?.message}
                               fullWidth
                               margin="normal"
                            />
                          )}
                        />
                        <Controller
                          name="email"
                          control={control}
                          rules={{
                            required:"Email is required",
                            pattern:{
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email",
                            }
                          }}
                          render={({field})=>(
                            <TextField
                               {...field}
                               label="Email"
                               type="email"
                               error={!!errors.email}
                               helperText={errors.email?.message}
                               fullWidth
                               margin="normal"
                            />
                          )}
                        />
                        <Controller
                          name="password"
                          control={control}
                          rules={{
                            required:"Password is required",
                            minLength:{
                              value:8,
                              message:"Password must be atleast 8 characters long"
                            },
                            pattern:{
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                              message:
                                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                            }
                          }}
                          render={({field})=>(
                            <TextField
                               {...field}
                               label="Password"
                               type="password"
                               error={!!errors.password}
                               helperText={errors.password?.message}
                               fullWidth
                               margin="normal"
                            />
                          )}
                        />
                        <Controller
                          name="confirmPassword"
                          control={control}
                          rules={{
                            validate: (value)=> value=== watch("password") || "Password do not match"
                          }}
                          render={({field})=>(
                            <TextField
                               {...field}
                               label="Confirm Password"
                               type="password"
                               error={!!errors.confirmPassword}
                               helperText={errors.confirmPassword?.message}
                               onChange={(e)=>{
                                field.onChange(e);
                                trigger("confirmPassword")
                               }}
                               fullWidth
                               margin="normal"
                            />
                          )}
                        />

                        <Box sx={{display:"flex", justifyContent:"flex-end",mt:2}}>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{backgroundColor:"goldenrod"}}
                              disabled={!isStep1Valid}
                            >
                                Next →
                            </Button>
                        </Box>
                    </Box>
                    {/* step -2 */}
                    <Box sx={{display: step===2?'block':'none'}}>
                        <Typography variant="h5" align="center" gutterBottom sx={{fontWeight:"bold"}}>Registration Process</Typography>
                        <FormControl margin="normal">
                           <FormLabel>Gender</FormLabel>
                           <Controller
                              name="gender"
                              control={control}
                              rules={{required:"Gender is required"}}
                              render={({field})=>(
                                <RadioGroup row {...field}>
                                   <FormControlLabel value="Male" control={<Radio/>} label="Male" />
                                   <FormControlLabel value="Female" control={<Radio/>} label="Female" />
                                   <FormControlLabel value="Other" control={<Radio/>} label="Other" /> 
                                </RadioGroup>
                              )}
                           /> 
                            {errors.gender && (
                              <Typography variant="body2" color="error">
                              {errors.gender.message}
                              </Typography>
                            )}

                        </FormControl>
                        <Controller
                          name="age"
                          control={control}
                          rules={{
                            required:"Age is required",
                            min: {
                             value: 10,
                             message: "Age must be at least 10"
                            },

                            max: {
                            value: 100,
                            message: "Age cannot exceed 100"
                            }
                          }}
                          render={({field})=>(
                            <TextField
                               {...field}
                               label="Age"
                               type="number"
                               error={!!errors.age}
                               helperText={errors.age?.message}
                               fullWidth
                               margin="normal"
                            />
                          )}
                        /> 
                        <Controller
                          name="phoneNumber"
                          control={control}
                          rules={{
                          required: "Phone is required",
                          pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Phone must be 10 digits",
                          },
                          }}

                          render={({field})=>(
                            <TextField
                               {...field}
                               label="Phone Number"
                               type="tel"
                               error={!!errors.phoneNumber}
                               helperText={errors.phoneNumber?.message}
                               fullWidth
                               margin="normal"
                            />
                          )}
                        /> 
                        <Controller
                          name="street"
                          control={control}
                          rules={{
                            required: "Street is required",

                            minLength: {
                            value: 5,
                            message: "Street must be at least 5 characters"
                            },

                            maxLength: {
                            value: 100,
                            message: "Street cannot exceed 100 characters"
                            },
                          }}
                          render={({field})=>(
                            <TextField
                               {...field}
                               label="Street"
                               error={!!errors.street}
                               helperText={errors.street?.message}
                               fullWidth
                               margin="normal"
                            />
                          )}
                        /> 
                        <Controller
                          name="city"
                          control={control}
                          rules={{
                            required:"City is required",

                            pattern:{
                            value:/^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                            message:"Only alphabets are allowed"
                            },

                             minLength:{
                             value:3,
                             message:"City must have at least 3 characters"
                             }
                            }}
                          render={({field})=>(
                            <TextField
                               {...field}
                               label="City"
                               error={!!errors.city}
                               helperText={errors.city?.message}
                               fullWidth
                               margin="normal"
                            />
                          )}
                        /> 
                        <Controller
                          name="state"
                          control={control}
                          rules={{
                            required:"State is required",

                            pattern:{
                            value:/^[A-Za-z\s]+$/,
                            message:"Only alphabets allowed"
                            }
                          }}
                          render={({field})=>(
                            <TextField
                               {...field}
                               label="State"
                               error={!!errors.state}
                               helperText={errors.state?.message}
                               fullWidth
                               margin="normal"
                            />
                          )}
                        /> 
                        <Controller
                          name="zipCode"
                          control={control}
                          rules={{
                            required:"Zip code is required",

                            pattern:{
                            value:/^\d{6}$/,
                            message:"Zip code must be 6 digits"
                            }
                          }}
                          render={({field})=>(
                            <TextField
                               {...field}
                               label="Zip Code"
                               error={!!errors.zipCode}
                               helperText={errors.zipCode?.message}
                               fullWidth
                               margin="normal"
                            />
                          )}
                        /> 

                        <Box sx={{display:"flex",justifyContent:"space-between",mt:2}}>
                           <Button variant="outlined" onClick={handleBack} sx={{backgroundColor:"goldenrod"}}> ← Back</Button>
                           <Button variant="contained" onClick={handleNext} sx={{backgroundColor:"goldenrod"}}
                           disabled={!isStep2Valid}>Next →</Button> 
                        </Box>        
                    </Box>
                    {/* step-3 */}
                    <Box sx={{display: step===3 ? 'block':'none'}}>
                      <Typography variant="h5" align="center" gutterBottom sx={{fontWeight:"bold"}}>Registration Process</Typography>
                     <Typography variant="h6" gutterBottom>Review Your Details</Typography>
                     <ul>
                      <li><strong>First Name: </strong>{values.firstName}</li>
                      <li><strong>Last Name: </strong>{values.lastName}</li>
                      <li><strong>Email: </strong>{values.email}</li>
                      <li><strong>Gender: </strong>{values.gender}</li>
                      <li><strong>Age: </strong>{values.age}</li>
                      <li><strong>Phone: </strong>{values.phoneNumber}</li>
                      <li><strong>Street</strong>{values.street}</li>
                      <li><strong>City: </strong>{values.city}</li>
                      <li><strong>State: </strong>{values.state}</li>
                      <li><strong>Zip: </strong>{values.zipCode}</li>
                     </ul>

                     <Typography variant="body2" color="text.secondary" gutterBottom>
                     If you want to make changes, go back and edit.
                     </Typography>

                     <Box sx={{display:"flex",justifyContent:"space-between",mt:2}}>
                      <Button variant="outlined" sx={{backgroundColor:"goldenrod"}} onClick={handleBack}> ← Back</Button>
                      <Button variant="contained" color="success" type="submit">Submit</Button>
                     </Box>

                    </Box>
                </form>
            </Paper>
            <Snackbar 
              open={snackbar.open}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.type}
              sx={{ width: "100%" }}
              >
              {snackbar.message}
              </Alert>

            </Snackbar>
        </Box>
    )
}