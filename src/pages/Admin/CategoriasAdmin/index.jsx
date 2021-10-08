import { Fab, Modal, Box, Typography, TextField, Button, CardContent, CardActions, Card, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../layouts/AdminLayout'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import api from '../../../services/api';

const style = {
  position: 'absolute',
  top: '25vh',
  left: '25vw',
  // transform: 'translate(-50%, -50%)',
  width: '50vw',
  bgcolor: 'background.paper',
  border: '0px transparent #000 ',
  borderRadius:'10px',
  padding: '2vh',
  boxShadow: 24,
}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

// function getScreen(type){
//   if(type=0){
//     return <ListCategorias/>
//   }
// }


export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  const [editCode, setEditCode] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [contador, setContador] = useState(0)
  
  const handleCloseModal = () => {
    setEditCode(null)
    reset()
    setModalOpen(false)
  }
  const handleOpenModal = () => setModalOpen(true)

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm()

  function handleEdit(data) {
    setValue('name', data.name)
    setValue('description', data.description)
    setEditCode(data.id)
    setModalOpen(true)
  }

  async function getCategorias(){
    const catList = await api.get('/categoria')
    if(catList.data)
    setCategorias(catList.data)
  }
  



  async function handleNewCategoria(data) {
    data = editCode ? { ...data, id: editCode } : data
    try {
      if (data.id) {
        const response = await api.put('/categoria',data)
        setContador(contador + 1)
        console.log(response);
        enqueueSnackbar(response.message, { variant: 'success' })
        setEditCode(null)
      } else {
        await api.post('/categoria',data)
        enqueueSnackbar("criado com sucesso", { variant: 'success' })
        setContador(contador + 1)
      }
      handleCloseModal()
    } catch (err) {
      enqueueSnackbar("erro ao criar/editar", { variant: 'error' })
    }

  }

  async function handleDelete(data) {
    if (window.confirm('deseja excluir esta categoria?')) {
      try {
        await api.delete(`/categoria/${data.id}`)
        enqueueSnackbar("deletado com sucesso", { variant: 'success' })
        setContador(contador - 1)
      } catch (err) {
        enqueueSnackbar("erro ao excluir", { variant: 'error' })
      }
    }
  }


  useEffect(() => {
    getCategorias()
  }, [contador])

  return (
    <AdminLayout page="Categorias">
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box component="form" sx={style} onSubmit={handleSubmit(handleNewCategoria)}>
          <TextField fullWidth {...register('name')} margin="normal" />
          <TextField fullWidth {...register('description')} margin="normal" />
          <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 2 }} >
            Submit
          </Button>
          <Button onClick={handleCloseModal}>cancelar</Button>
        </Box>
      </Modal>
      <Fab color="primary" variant="extended" aria-label="add" onClick={handleOpenModal} sx={fabStyle}>
        <AddIcon />
        Nova Categoria
      </Fab>
      {categorias && categorias.map((categoria) => (
        <Card sx={{ width:'15vw', maxHeight: '50%', marginLeft: '2vw', marginTop:'2vw', display: 'block', float:'left' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {categoria.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {categoria.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="edit" onClick={()=>handleEdit(categoria)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={()=>handleDelete(categoria)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </AdminLayout>
  )
}
