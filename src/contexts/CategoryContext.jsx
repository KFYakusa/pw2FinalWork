import React, { createContext, useState } from 'react'
import api from '../services/api'
import { deleteCategory, getAllCategories, getCategory, updateCategory } from '../services/categorias'

const CategoryContext = createContext({})

export const CategoryProvider = ({children})=>{
  const [list,setList] = useState(getAllCategories())

  const add = useCallback( async ({ name,description})=>{
    createCategory({name,description})
  },[list])

  const edit = useCallback( async(obj)=>{
    updateCategory(obj)
  },[list])

  const erase = useCallback( async(obj)=>{
    deleteCategory(obj)
  })

  const getId = useCallback( async(obj)=>{
    return getCategory(obj)

  })
  

  return (
    <CategoryContext.Provider value={{
      list,add,edit,erase,getId
    }}>
      {children}
    </CategoryContext.Provider>

  )


}
