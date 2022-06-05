import { IconButton, TableCell, TableRow } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

export default function PeopleItem({ name, deletePerson }) {

  const onClick = () => {
    deletePerson(name);
  }

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell align='right'>
        <IconButton onClick={onClick}>
          <CloseIcon></CloseIcon>
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
