import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

export default function TaxTipForm({ tax, setTax, tip, setTip }) {

  const onTaxChange = (event) => {
    setTax(Number(event.target.value));
  }

  const onTipChange = (event) => {
    setTip(Number(event.target.value));
  }

  return (
    <div className='row'>
      <TextField
        type='number'
        label='Tax'
        fullWidth
        sx={{margin: '10px'}}
        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
        value={tax}
        onChange={e => onTaxChange(e)}
        variant='filled'
        onFocus={event => { event.target.select() }}
      />
      <TextField
        type='number'
        label='Tip'
        fullWidth
        sx={{margin: '10px'}}
        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
        value={tip}
        onChange={e => onTipChange(e)}
        variant='filled'
        onFocus={event => { event.target.select() }}
      />
    </div>
  )
}
