import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../layouts/AdminLayout'
import { Fab, Modal, Box, Typography, TextField, Button, CardContent, CardActions, Card, IconButton, Select, MenuItem } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import api from '../../../services/api';
import { useSnackbar } from 'notistack';

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

const selectStyled = {
  width: '50%'
}


export default function FilmesAdmin() {
  const [categorias,setCategorias] = useState([])
  const [filmes, setFilmes] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  const [editCode, setEditCode] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [catShow, setCatShow] = useState('')
  const [timesSubmitted, setTimesSubmitted] = useState(0)
  
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm()
    
  useEffect(() => {
    getListas()
  }, [timesSubmitted])

  const handleOpenModal = () => {
    if(categorias.length !==0)
      setModalOpen(true)
    else{
      enqueueSnackbar("Filmes são de algum gênero, não?! não há algum cadastrado", { variant: 'error' })
    }
  }
  const handleCloseModal = () => {
    setEditCode(null)
    reset()
    setModalOpen(false)
  }

  const handleSelect = (event)=>{
    setCatShow(event.target.value)
  }

  async function getListas(){
    const respCat = await api.get('/categoria')
    if(respCat.data)
      setCategorias(respCat.data)

    const respFilme = await api.get('/filme')
    if(respFilme.data)
      setFilmes(respFilme.data)
  }
  

  async function handleNewFilme(data){
    data = editCode ? { ...data, id: editCode } : data
    try {
      if (data.id) {
        const response = await api.put('/filme',data)
        setTimesSubmitted(timesSubmitted + 1)
        console.log(response);
        enqueueSnackbar(response.message, { variant: 'success' })
        setEditCode(null)
      } else {
        await api.post('/filme',data)
        enqueueSnackbar("criado com sucesso", { variant: 'success' })
        setTimesSubmitted(timesSubmitted + 1)
      }
      handleCloseModal()
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' })
    }
  }


  async function handleEdit(data){
    setValue('title',data.title)
    setValue('description',data.description)
    setValue('categorias',data.categoria)
    setEditCode(data.id)
    handleOpenModal()
  }


  async function handleDelete(data){
    if(window.confirm('certeza que deseja excluir este filme?')){
      try{
        await api.delete(`/filme/${data.id}`)
        setTimesSubmitted(timesSubmitted-1)
        enqueueSnackbar("filme excluído", { variant: 'success' })
      }catch(err){
        enqueueSnackbar("error", { variant: 'error' })
      }
    }
  }


  
  return (
    <AdminLayout page="Filmes">
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box component="form" sx={style} onSubmit={handleSubmit(handleNewFilme)}>
          <TextField fullWidth {...register('title')} margin="normal" />
          <TextField fullWidth {...register('description')} margin="normal" />
          <Select {...register('categoria')} id="categoria" value={catShow} sx={selectStyled} onChange={handleSelect}> 
              {categorias && categorias.map((categoria)=>(
                <MenuItem key={categoria.id} value={categoria.id}>{ categoria.name}</MenuItem>
              ))}

          </Select>
          <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 2 }} >
            Submit
          </Button>
          <Button onClick={handleCloseModal}>cancelar</Button>
        </Box>
      </Modal>
      <Fab color="primary" variant="extended" aria-label="add" onClick={handleOpenModal} sx={fabStyle}>
        <AddIcon />
        Novo Filme
      </Fab>
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
          <CardActions disableSpacing>
            <IconButton aria-label="edit" onClick={()=>handleEdit(filme)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={()=>handleDelete(filme)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </AdminLayout>
  )
}
