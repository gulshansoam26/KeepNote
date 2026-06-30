import { useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type ProfileFormInputs = {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function UserProfile() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<ProfileFormInputs>({
    mode: "onChange",
  });

  // old values fetch
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      console.log(userId)
      const response = await fetch(
        `http://localhost:3000/users/${userId}`
      );

      const user = await response.json();

      // old values form me fill
      reset({
        email: user.email,
        phone: user.phoneNumber,
        password: "",
        confirmPassword: "",
      });
    };

    fetchUser();
  }, [userId, reset]);

  const password = watch("password");

  const onSubmit = async (
    data: ProfileFormInputs
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            phone: data.phone,
            ...(data.password && {
            password: data.password,
          }),
          }),
        }
      );

      if (!response.ok) {
      throw new Error("Update failed");
    }
      const updatedUser = await response.json();

      alert(
        `${updatedUser.email} updated successfully`
      );
      navigate("/home");
      clearFormData();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while updating the profile.");
    }
  };

  const clearFormData = () => {
    reset({
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography
            variant="h5"
            align="center"
          >
            Update Profile
          </Typography>

          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              slotProps={{
               inputLabel: {
               shrink: true,
               },
              }}
              {...register("email", {
                required: "Email required",
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              error={!!errors.email}
              helperText={
                errors.email?.message
              }
            />

            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              slotProps={{
               inputLabel: {
               shrink: true,
               },
              }}
              {...register("phone", {
                required: "Phone required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message:
                    "Phone must be 10 digits",
                },
              })}
              error={!!errors.phone}
              helperText={
                errors.phone?.message
              }
            />

            <TextField
              fullWidth
              type="password"
              margin="normal"
              label="Password"
              {...register("password", {
                validate: (value) =>
                !value ||
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                value
                ) ||
               "Password must contain uppercase, lowercase, number, special character and minimum 8 characters",
              })}
              error={!!errors.password}
              helperText={
                errors.password?.message
              }
            />

            <TextField
              fullWidth
              type="password"
              margin="normal"
              label="Confirm Password"
               {...register("confirmPassword", {
               validate: (value) => {
               if (!password) return true;

                return (
               value === password ||
                "Passwords do not match"
                );
               },
              })}
              error={
                !!errors.confirmPassword
              }
              helperText={
                errors
                  .confirmPassword?.message
              }
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={!isValid}
              sx={{ mt: 2 ,background:"goldenrod"}}
            >
              Update
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}