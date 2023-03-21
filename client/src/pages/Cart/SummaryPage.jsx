import React from 'react'
import { Divider, Typography } from '@mui/material'

const SummaryPage = () => {
  return (<>
    <Typography
    variant="h6"
    color={"grey"}
    component={"span"}
    sx={{ fontWeight: "bold",}}
  >
    Summary
  </Typography>
  <Divider/>
  </>
  )
}

export default SummaryPage