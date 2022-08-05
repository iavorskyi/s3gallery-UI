import * as React from 'react';
import * as s from "./styles";

import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { Paper} from "@mui/material";

const baseURL = "https://upper-austria.ventuscloud.eu:8080"
const projectID = "c9801b4d232344f0869154501beaf8ed"
const generatePath = (album, name) => {
    return `${baseURL}/${projectID}:${album}/${name}`
}

function Gallery(props) {
    const [item, setItem] = React.useState(null);
    const [items, setItems] = React.useState(null);
    const [isFileLoading, setIsFileLoading] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setErrorFlag] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const config = {
        headers: { Authorization: `Bearer ${props.token}` }
    };

    const handleFileUpload = (e) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        setFile(file);

        const uploadItem = async () => {
            try {
                setIsFileLoading(true)
                const data = new FormData();
                data.append(
                    'image', file
                )
                // const url = 'http://localhost:8000/api/albums/demo/items/'
                const url = '/api/albums/demo/items/'

                // DEV MOD
                const response = await axios.post(url, data, config);
                if (response.status === 200) {
                    console.log(response.data)
                    alert(` You have added: ${JSON.stringify(file.name)}`);
                    setIsFileLoading(false)
                } else {
                    throw new Error("An error has occurred");
                    setIsFileLoading(false)
                }
            } catch (error) {
                alert("An error has occurred");
                setIsFileLoading(false)
            }
        };
        uploadItem();
    }

    React.useEffect(() => {
        console.log("In useEffect")
        const source = axios.CancelToken.source();
        // DEV MOD
        // const url = 'http://localhost:8000/api/albums/demo/items/';
        const url = '/api/albums/demo/items/';
        const fetchImages = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(url, config);
                if (response.status === 200) {
                    setItems(response.data);
                    return;
                } else {
                    throw new Error("Failed to fetch items");
                }
            } catch (error) {
                if(axios.isCancel(error)){
                    console.log('Data fetching cancelled');
                }else{
                    setErrorFlag(true);
                    setIsLoading(false);
                }
            }
        };
        fetchImages();
        return () => source.cancel("Data fetching cancelled");
    }, [isFileLoading]);


    return (
        <>
            <Button
                sx={{marginLeft:"2em"}}
                component="label"
                variant="outlined"
            >
                ADD IMAGE
                <input type="file" accept=".jpeg, .jpg" hidden onChange={handleFileUpload} />
            </Button>
            <Paper elevation={3} sx={{margin:"2em", paddingY:'1em'}}>
                <s.ImageListContainer sx= {{display: 'flex', flexWrap: 'wrap', margin:'1em'}}>
                    {items ?
                        items.map((item) => (
                                <ImageListItem key={item.name}>
                                    <img
                                        src={generatePath(item.album, item.name)}
                                        alt={item.name}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))
                        : <Typography>No images</Typography>}

                </s.ImageListContainer>
            </Paper>
        </>
    
    );
}

export default Gallery