import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPackages } from "../clients/InventoryClient";
import { Package } from "../Package";


export default function InventoryDashboard() {
  const tableHeaders = ["Name", "Amount"]

  const [packages, setPackages] = useState<Package[]>([])
  const [dataSummary, setDataSummary] = useState({min: 0, max: 0, average: 0})

  useEffect(() => {
    const fetchPackages = async () => {
      const packs = await getPackages()
      setPackages(packs.data)
    }

    fetchPackages()
  }, [])

  useEffect(() => {
    const max = Math.max(...packages.map(p => p.amount))
    const min = Math.min(...packages.map(p => p.amount))
    const average = packages.reduce((sum, p) => sum + p.amount, 0)/packages.length
    setDataSummary({min, max, average})
  }, [])

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={3}>
            <Grid container item spacing={2}>
              <Grid item xs={12}>Data summary</Grid>
              <Grid item xs={6}>Minimum amount: </Grid>
              <Grid item xs={6}>{dataSummary.min}</Grid>
              <Grid item xs={6}>Average amount: </Grid>
              <Grid item xs={6}>{dataSummary.average}</Grid>
              <Grid item xs={6}>Maximum amount: </Grid>
              <Grid item xs={6}>{dataSummary.max}</Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3}>
            Graphic Chart
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {tableHeaders.map((header) => (
                      <TableCell>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {packages.map((pack) => (
                    <TableRow>
                      <TableCell>{pack.name}</TableCell>
                      <TableCell>{pack.amount}</TableCell>




                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}