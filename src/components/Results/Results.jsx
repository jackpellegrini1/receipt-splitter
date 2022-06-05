import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import React from 'react'

export default function Results({ people, items, tax, tip }) {

  const calculateRowData = () => {

    const rowData = {}
    people.forEach(person => {
      rowData[person] = { name: person, items: 0, tax: 0, tip: 0, total: 0 }
    })

    let priceBeforeTaxTip = 0;
    items.forEach(item => {
      const numPeople = item.selectedPeople.length;
      const totalPerPerson = item.price / numPeople;
      item.selectedPeople.forEach(person => {
        rowData[person].items += totalPerPerson;
      })
      priceBeforeTaxTip += item.price;
    })

    people.forEach(person => {
      const personData = rowData[person];
      const billPercentage = personData.items / priceBeforeTaxTip;
      personData.tax = tax * billPercentage;
      personData.tip = tip * billPercentage;
      personData.total = personData.items + personData.tax + personData.tip;
    })

    return Object.values(rowData);
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell><b>Items</b></TableCell>
            <TableCell><b>Tax</b></TableCell>
            <TableCell><b>Tip</b></TableCell>
            <TableCell><b>Total</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {calculateRowData().map(row =>
            <TableRow key={row.name}>
              <TableCell><b>{row.name}</b></TableCell>
              <TableCell >${row.items.toFixed(2)}</TableCell>
              <TableCell>${row.tax.toFixed(2)}</TableCell>
              <TableCell>${row.tip.toFixed(2)}</TableCell>
              <TableCell>${row.total.toFixed(2)}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
