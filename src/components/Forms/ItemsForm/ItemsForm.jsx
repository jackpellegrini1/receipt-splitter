import { Table, TableContainer, TextField, Paper, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import React, { useState } from 'react'
import ItemsItem from './subComponents/ItemsItem'

export default function ItemsForm({ items, addItem, deleteItem, editItem, people }) {

  const [inputText, setInputText] = useState('');
  const [errorState, setErrorState] = useState(false);

  const handleKeyDown = (key) => {
    if (key === 'Enter') {
      if (items.map(item => item.name).includes(inputText)) {
        setErrorState(true);
      } else {
        setErrorState(false);
        const item = { name: inputText, price: 0, selectedPeople: [] }
        addItem(item);
        setInputText('');
      }
    }
  }

  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }

  const createEditItem = (index) => {
    return item => {
      editItem(item, index);
    }
  }

  return (
    <>
      <TableContainer component={Paper} className='marginBottom10'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '20%' }}><b>Name</b></TableCell>
              <TableCell sx={{ width: '25%' }}><b>Price</b></TableCell>
              <TableCell sx={{ width: '53%' }}><b>People</b></TableCell>
              <TableCell sx={{ width: '2%' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <ItemsItem key={item.name} item={item} people={people} deleteItem={deleteItem} editItem={createEditItem(index)}></ItemsItem>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TextField
        value={inputText}
        variant='filled'
        fullWidth
        placeholder='Item'
        onChange={e => handleInputChange(e)}
        onKeyPress={(e) => handleKeyDown(e.key)}
        error={errorState}
        helperText={errorState ? "Cannot have duplicate items" : null}
      >
      </TextField>
    </>
  )
}
