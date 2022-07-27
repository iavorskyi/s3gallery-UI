import * as React from 'react';
import * as s from "./styles";
import Box from '@mui/material/Box';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from "axios";
import {Button, Paper} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {ImageListContainer} from "./styles";



const baseURL = "https://upper-austria.ventuscloud.eu:8080"
const projectID = "c9801b4d232344f0869154501beaf8ed"
// const album = "demo"
// const itemName = 'resized/img-6'


function Gallery() {
    const [imgName, setImgName] = React.useState(null);
    const [item, setItem] = React.useState(null);
    const [items, setItems] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setErrorFlag] = React.useState(false);
    const changeUserIdHandler = () => {
        setImgName((imgName) => (imgName === 'img-5' ? 'img-6' : 'img-5'));
    };

    const handleChange = (event) => {
        setImgName(event.target.value);
    };

    React.useEffect(() => {
        const source = axios.CancelToken.source();
        const url = `http://localhost:8080/api/albums/demo/items/`;
        const fetchImages = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(url, { headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTg5NTUxNjQsImlhdCI6MTY1ODkxMTk2NCwidXNlcl9pZCI6MTB9.lsEjmJTbBs0uLqm249yElhuQ5dt0UeXr8OF7FrA7QsA'
                    }});
                if (response.status === 200) {
                    setItems(response.data);
                    setIsLoading(false);
                    return;
                } else {
                    throw new Error("Failed to fetch users");
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



const srcPath = baseURL+"/"+projectID +":"+item?.album+"/"+item?.name
    const generatePath = (album, name) => {
      return `${baseURL}/${projectID}:${album}/${name}`
    }
    return (
        <>
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