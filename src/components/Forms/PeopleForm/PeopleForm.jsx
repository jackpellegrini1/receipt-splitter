import React, { useState } from 'react'
import { TextField, TableContainer, Paper, Table, TableBody } from '@mui/material'
import PeopleItem from './subComponents/PeopleItem';

export default function PeopleForm({ people, addPerson, deletePerson }) {

  const [inputText, setInputText] = useState('');
  const [errorState, setErrorState] = useState(false);

  const handleKeyDown = (key) => {
    if (key === 'Enter') {
      if (people.includes(inputText)) {
        setErrorState(true);
      } else {
        setErrorState(false);
        addPerson(inputText);
        setInputText('');
      }
    }
  }

  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }

  return (
    <>
      <TableContainer component={Paper} className='marginBottom10'>
        <Table>
          <TableBody>
            {people.map(person => <PeopleItem key={person} deletePerson={deletePerson} name={person}></PeopleItem>)}
          </TableBody>
        </Table>
      </TableContainer>
      <TextField
        value={inputText}
        variant='filled'
        placeholder='Name'
        fullWidth
        onChange={e => handleInputChange(e)}
        onKeyPress={(e) => handleKeyDown(e.key)}
        error={errorState}
        helperText={errorState ? "Cannot have duplicate names" : null}
      >
      </TextField>
    </>
  )
}
