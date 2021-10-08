
import { createTheme, CssBaseline, Grid, ThemeProvider, Box, Avatar, Typography, TextField,Link, Button, Paper } from '@mui/material';
import React, {useEffect, useState} from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';



const theme = createTheme();

export default function Login() {
  
  const { isAuth,login } = useAuth()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar();
  
  const {register, handleSubmit, formState:{errors,isSubmitting}} = useForm()

  async function handleSingIn(data) {
    
   const response = await login(data)
    console.log(response);
   if(response.token){
     history.push('/adm')
   }else{
    enqueueSnackbar(response.message, { variant:'error' });
   }
  }

  useEffect(() => {
    if(isAuth){
      history.push('/adm')
    }
  }, [isAuth])

  
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)', backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900], backgroundSize: 'cover', backgroundPosition: 'center', }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form"  onSubmit={handleSubmit(handleSingIn)} sx={{ mt: 1 }}>
                <TextField {...register('email')} fullWidth margin="normal" />
                <TextField {...register('password')} margin="normal" fullWidth name="password" label="Password" type="password" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

