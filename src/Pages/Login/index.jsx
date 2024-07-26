import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import AuthContext from '../../utils/AuthContext';
import Toast from '../../Components/Toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  const isMobile = useMediaQuery('(max-width:900px)');
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });
  const { handleToken } = useContext(AuthContext);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (values) => {
    try {
      if(!values.username||!values.password){
        setToast({ message: "username and password is required!", type: "error" })
      }else{
        const response = await fetch('https://api.roohbakhshac.ir/api/app/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        const data = response.json()
        if(data.status===200){
          handleToken(data.token)
          setToast({message:"welcome",type:"success"})
        }else{
          setToast({message:"username or Password is incorrect!",type:"error"})
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'98%'}
      height={'97%'}
      sx={{
        bgcolor: 'rgb(241, 241, 241)',
        border: '10px white solid',
        borderRadius: '20px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
      }}
    >
      <Stack
        sx={{ width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgb(255, 104, 255)', borderRadius: '20px', backgroundImage: `url('./img.JPG')`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", display: `${isMobile ? 'none' : 'block'}` }}
      ></Stack>
      <Stack
        sx={{ width: `${isMobile ? '100%' : '50%'}`, height: '95%', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
      >
        <Stack sx={{ position: 'absolute', top: '10px', right: '5%' }} direction={'row'} gap={1}>
          <Typography>Not a member?</Typography>
          <Link to={'/register'}>Register now</Link>
        </Stack>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Stack alignItems={'center'} justifyContent={'center'} gap={2.5}>
                <Typography variant='h4'>Hello Again!</Typography>
                <Typography sx={{ color: 'rgb(106, 106, 106)' }}>Welcome back you`ve been missed!</Typography>
                <Field
                  as={TextField}
                  name="username"
                  id="outlined-basic"
                  label="Enter Username"
                  variant="outlined"
                  sx={{ width: '300px' }}
                  error={touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                />
                <Field
                  as={TextField}
                  name="password"
                  id="outlined-password-input"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  sx={{ width: '300px' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          sx={{ color: 'black' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
                <Stack direction={'row'} width={'100%'} alignItems={'center'} justifyContent={'end'}>
                  <Link to={'/password-recovery'} className='text'>Recovery Password</Link>
                </Stack>
                <Button
                  sx={{ width: '300px', bgcolor: 'rgb(244, 93, 93)', '&:hover': { bgcolor: 'rgb(245, 69, 69)' } }}
                  type="submit"
                  variant='contained'
                >
                  Sign in
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
        <Stack direction={'column'}>
          <Stack py={2} direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'300px'}>
            <Box sx={{ width: '25%', height: '4px', bgcolor: '#fff', borderRadius: '20px' }}></Box>
            <Typography className='text'>Or continue with</Typography>
            <Box sx={{ width: '25%', height: '4px', bgcolor: '#fff', borderRadius: '20px' }}></Box>
          </Stack>
          <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'space-around'} width={'300px'}>
            <Stack sx={{ '&:hover': { backgroundColor: '#fff', boxShadow: '0px 5px 50px 5px rgba(0,0,0,0.36)' }, transition: 'all 0.2s linear', }} alignItems={'center'} justifyContent={'center'} width={'60px'} height={'50px'} borderRadius={'10px'}>
              <img className='image' src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png" alt="Google" />
            </Stack>
            <Stack sx={{ '&:hover': { backgroundColor: '#fff', boxShadow: '0px 5px 50px 5px rgba(0,0,0,0.36)' }, transition: 'all 0.2s linear', }} alignItems={'center'} justifyContent={'center'} width={'60px'} height={'50px'} borderRadius={'10px'}>
              <img className='image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmMLJFNvwTjJIiBjasTP7xgFIR91WjyrEtnHaUyqVEAQ&s" alt="توضیحات عکس" />
            </Stack>
            <Stack sx={{ '&:hover': { backgroundColor: '#fff', boxShadow: '0px 5px 50px 5px rgba(0,0,0,0.36)' }, transition: 'all 0.2s linear', }} alignItems={'center'} justifyContent={'center'} width={'60px'} height={'50px'} borderRadius={'10px'}>
              <img className='image' src="https://static-00.iconduck.com/assets.00/facebook-color-icon-2048x2048-bfly1vxr.png" alt="توضیحات عکس" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Toast message={toast.message} type={toast.type} />
    </Stack>
  );
}
