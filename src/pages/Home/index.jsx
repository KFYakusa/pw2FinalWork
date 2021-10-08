import { Card, CardActions, CardContent, Fab, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';



const fabStyle = {
  position: 'absolute',
  bottom: '50vh',
  right: '47vw',
};



export default function Home() {
  const [filmes,setFilmes] = useState([])
  const [categorias, setCategorias] = useState([])


  async function getCategorias(){
    const response = await api.get('/categoria')
    if(response.data)
      setCategorias(response.data)
  }

  async function getFilmes(){
    const response = await api.get('/filme')
    if(response.data)
      setFilmes(response.data)
  }

useEffect(() => {
  getCategorias()
  getFilmes()
}, [])


  return (
    <div>
       {filmes && filmes.map((filme) => (
        <Card key={filme.id} sx={{ width:'15vw', maxHeight: '50%', marginLeft: '2vw', marginTop:'2vw', display: 'block', float:'left' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {filme.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {categorias.find(categoria=> filme.categoria_id == categoria.id ).name}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Fab color="primary" component={Link} to={"/login"} variant="extended" aria-label="add" sx={fabStyle}>
        <LoginIcon/>
        Login
      </Fab>
    </div>
  )
}
