import React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Fab } from '@mui/material';

const fabStyle = {
  position: 'absolute',
  top: 16,
  left: 16,
};


export default function FormCategorias(props) {
  return (
    <div>
      
      <Fab color="primary" variant="extended" aria-label="add" onClick={props.showForm} sx={fabStyle}>
<ChevronLeftIcon />
Nova Categoria
</Fab>
    </div>
  )
}
