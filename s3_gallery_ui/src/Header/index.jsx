
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import * as React from 'react';
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel} from "@mui/material";

export const Header = () =>  {
    const [album=20, setAlbum] = React.useState(20);

  const handleChange = (event) => {
    setAlbum(event.target.value);
  };
    return (
        <>
            <Box
                sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1, margin: '2em' }}
            >

                    <Typography sx={{flexGrow: 2}} variant="h4"> s3 Gallery</Typography>
                <FormControl sx={{flexGrow:5}}>
                    <InputLabel id="header-select-label">Album</InputLabel>
                    <Select
                        width='12'
                        labelId="select-album"
                        id="select-album"
                        value={album}
                        name='Album'
                        label='album'
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>My Album</MenuItem>
                        <MenuItem value={20}>Nature</MenuItem>
                        <MenuItem value={30}>Privat photos</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{display:'flex', flexDirection: 'row-reverse', flexGrow:3}} >

                        <Link href="#">Sign-in</Link>


                </Box>
            </Box>
        </>
    );
}

export default Header
