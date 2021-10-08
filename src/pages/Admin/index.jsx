import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import Header from '../../components/Header';
import AdminLayout from '../../layouts/AdminLayout';



export default function Admin() {


  return (
    <AdminLayout page="DashBoard"> DashBoard</AdminLayout>
  )
}
