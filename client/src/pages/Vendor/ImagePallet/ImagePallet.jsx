import { Box, Paper, Stack, TextField } from '@mui/material';
import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const ImagePallet = () => {
  return (
    <Paper>
      <Stack direction={'row'} sx={{alignItems:'center',p:1}}>
        <Box sx={{width:40,height:20,backgroundColor:'red',m:1,mr:2,borderRadius:"10px"}}></Box>
        <TextField id="ou" label="over" variant="outlined" m={1} size='small'/>
        <Fab size="small" color="secondary" aria-label="add">
        {/* <AddIcon /> */}
      </Fab>
      </Stack>
    </Paper>
  )
}

export default ImagePallet