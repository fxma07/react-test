import React from 'react'

import './cropper.css'
import Button from '@material-ui/core/Button'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import getCroppedImg, { generateDownload } from '../../utils/cropImage'
import CancelIcon from '@material-ui/icons/Cancel'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core'
import { dataURLtoFile } from '../../utils/dataURLtoFile'

const useStyles = makeStyles({
    iconButton:{
        position: 'absolute',
        top: '300px',
        right: '20px',
    },
    cancelIcon:{
        color: '#f5f5f5',
        fontSize: '50px',
        '&:hover':{
            color: 'red',
        }
    }
})

export default function RenderCropper({handleCropper, setAvatar}) {
    const classes = useStyles();
    const inputRef = React.useRef();
    const triggerFileSelectPopup = () => inputRef.current.click();
    const [image, setImage]=React.useState(null);
    const [croppedArea, setCroppedArea]=React.useState(null);
    const[crop, setCrop]= React.useState({x:0,y:0})
    const[zoom, setZoom]=React.useState(1);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels)
    };

    const onSelectFile = (event) => {
        if(event.target.files && event.target.files.length > 0){
            const reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.addEventListener('load', ()=>{
                setImage(reader.result);
            })
        }
       
    }
    
    const onDownload = () => {
        generateDownload(image, croppedArea);
    };

    const onUpload = async () => {
         const canvas = await getCroppedImg(image, croppedArea);
         const canvasDataUrl = canvas.toDataURL('image/jpeg');
         const convertedUrlToFile = dataURLtoFile(canvasDataUrl, 'cropped-image.jpeg');
        
         try{
            const formdata = new FormData()
            formdata.append('croppedImage', convertedUrlToFile)

            const res = await fetch('http://localhost:4000/api/users/setProfilePic', {
                method: 'POST',
                body: formdata,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const res2 = await res.json()
            console.log(res2)
            setAvatar(res2.data)
         }catch(err){
            console.warn(err);
         }
       
         
    };

   
    return (
        <div className='container'>
        <IconButton className={classes.iconButton} onClick={handleCropper}>
            <CancelIcon className={classes.cancelIcon}/>
        </IconButton>
            <div className='container-cropper'>
                {
                    image ? <>
                <div className="cropper">
                    <Cropper 
                    image={image} 
                    crop={crop} 
                    zoom={zoom} 
                    aspect={1} 
                    onCropChange={setCrop} 
                    onZoomChange={setZoom} 
                    onCropComplete={onCropComplete}/>
                </div>    
                <div className="slider">
                     <Slider min={1} max={3} step={0.1} onChange={(e, zoom)=>setZoom(zoom)}/>
                </div>
                </> : null
                }
            </div>
            <div className='container-buttons'>
            <input 
                type='file' 
                accept='image/*' 
                ref={inputRef} 
                style={{display:'none'}}
                onChange={onSelectFile}  
            />
                <Button 
                variant='contained' 
                color='primary' 
                style={{marginRight:'10px'}} 
                onClick ={()=> setImage(null)}>
                Clear
                </Button>
                <Button variant='contained' color='primary' onClick={triggerFileSelectPopup} style={{marginRight:'10px'}}>Choose</Button>
                   
                <Button variant='contained' color='secondary' onClick={onDownload}style={{marginRight:'10px'}}>Download</Button>
                <Button variant='contained' color='secondary' onClick={onUpload}>Upload</Button>
            </div>
        </div>
    )
}
