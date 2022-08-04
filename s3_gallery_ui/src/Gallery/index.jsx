import * as React from 'react';
import * as s from "./styles";

import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import axios from "axios";
import { Paper} from "@mui/material";

const baseURL = "https://upper-austria.ventuscloud.eu:8080"
const projectID = "c9801b4d232344f0869154501beaf8ed"

function Gallery() {
    const [item, setItem] = React.useState(null);
    const [items, setItems] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setErrorFlag] = React.useState(false);
    const [file, setFile] = React.useState(null);

    const handleFileUpload = (e) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        setFile(file);

        const uploadItem = async () => {
            try {
                setIsLoading(true)
                const data = new FormData();
                data.append(
                    'image', file
                )
                const response = await axios.post('/api/albums/demo/items/', data);
                if (response.status === 200) {
                    console.log(response.data)
                    alert(` You have added: ${JSON.stringify(file.name)}`);
                    setIsLoading(false)
                } else {
                    throw new Error("An error has occurred");
                    setIsLoading(false)
                }
            } catch (error) {
                alert("An error has occurred");
                setIsLoading(false)
            }
        };
        uploadItem();
    }

    React.useEffect(() => {
        const source = axios.CancelToken.source();
        const url = '/api/albums/demo/items/';
        const fetchImages = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(url);
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
    }, []);
    React.useEffect(() => {
        const source = axios.CancelToken.source();
        const url = '/api/albums/demo/items/';
        const fetchImages = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(url);
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
    }, [isLoading]);



const srcPath = baseURL+"/"+projectID +":"+item?.album+"/"+item?.name
    const generatePath = (album, name) => {
      return `${baseURL}/${projectID}:${album}/${name}`
    }
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
                    {items?.map((item) => (
                        <ImageListItem key={item.name}>
                            <img
                                src={generatePath(item.album, item.name)}
                                alt={item.name}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </s.ImageListContainer>
            </Paper>
        </>
    
    );
}

export default Gallery