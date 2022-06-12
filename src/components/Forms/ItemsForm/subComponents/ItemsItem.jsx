import { IconButton, InputAdornment, MenuItem, Select, TableCell, TableRow, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import { useState } from 'react';

export default function ItemsItem({ item, people, deleteItem, editItem }) {

  const [price, setPrice] = useState(item.price);

  const [selectedPeople, setSelectedPeopole] = useState(item.selectedPeople);

  const onPriceChange = (event) => {
    setPrice(Number(event.target.value));
    const updatedPriceObj = { price: Number(event.target.value) };
    const updatedItem = { ...item, ...updatedPriceObj };
    editItem(updatedItem);
  }

  const onSelectedPeopleChange = (event) => {
    setSelectedPeopole(event.target.value);
    const updatedSelectedPeopleObj = { selectedPeople: event.target.value };
    const updatedItem = { ...item, ...updatedSelectedPeopleObj };
    editItem(updatedItem);
  }

  const onDelete = () => {
    deleteItem(item);
  }

  return (
    <TableRow>
      <TableCell>{item.name}</TableCell>
      <TableCell>
        <TextField
          type='number'
          fullWidth
          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
          value={price}
          onChange={e => onPriceChange(e)}
          variant='filled'
          onFocus={event => { event.target.select() }}
        ></TextField>
      </TableCell>
      <TableCell>
        <Select
          multiple
          fullWidth
          value={selectedPeople}
          onChange={e => onSelectedPeopleChange(e)}
          variant='filled'
        >
          {people.map(person => (
            <MenuItem key={person} value={person}>{person}</MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell align='right' style={{ width: '30px' }}>
        <IconButton onClick={onDelete}><CloseIcon /></IconButton>
      </TableCell>
    </TableRow>
  )
}
