import { Fab } from '@mui/material';
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};



export default function ListCategorias(props) {

  
  return (
    <div>
      <Fab color="primary" variant="extended" aria-label="add" onClick={props.showForm} sx={fabStyle}>
        <AddIcon />
        Nova Categoria
      </Fab>
    </div>
  )
}
