import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import './UploadImage.css'
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";



const ImageUpload=({cardTitle,fileSelector,setUrl})=>{
    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: "%"});
    const [completedCrop, setCompletedCrop] = useState(null);

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onLoad = useCallback((img) => {
    imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
          return;
        }
    
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");
        const pixelRatio = window.devicePixelRatio;
    
        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;
    
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY
        );
    }, [completedCrop]);
    const resizeImage=(base64Str, maxWidth = 900, maxHeight = 450)=> {
        return new Promise((resolve) => {
          let img = new Image()
          img.src = base64Str
          img.onload = () => {
            let canvas = document.createElement('canvas')
            const MAX_WIDTH = maxWidth
            const MAX_HEIGHT = maxHeight
            let width = img.width
            let height = img.height
      
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width
                width = MAX_WIDTH
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height
                height = MAX_HEIGHT
              }
            }
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL())
          }
        })
      }
    const generateImageUrl= (canvas, crop)=>{
        if (!crop || !canvas) {
          return;
        }

        let imageUrl = canvas.toDataURL();
        resizeImage(imageUrl)
        setUrl(imageUrl);
        /////////////////////////////////// To Download Cropped Image
        // canvas.toBlob(
        //     (blob) => {
        //       const previewUrl = window.URL.createObjectURL(blob);
        
        //       const anchor = document.createElement('a');
        //       anchor.download = 'cropPreview.png';
        //       anchor.href = URL.createObjectURL(blob);
        //       anchor.click();
        
        //       window.URL.revokeObjectURL(previewUrl);
        //     },
        //     'image/png',
        //     1
        //   );
    }

  return (
    <Card>
        <CardHeader  className="ImageUploadCardHeader">
            <h1>Question {cardTitle} Image</h1>
        </CardHeader>
        <CardBody className="ImageUploadCardBody">
            <label className="btn btn-block" for={fileSelector}>
                <input id={fileSelector} type="file" className="d-none" accept="image/*" onChange={onSelectFile}/>
                Upload Image
            </label>
            <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
            />
            <div>
                <canvas
                hidden
                ref={previewCanvasRef}
                // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                style={{
                    width: Math.round(completedCrop?.width ?? 0),
                    height: Math.round(completedCrop?.height ?? 0)
                }}
                />
            </div>
        </CardBody>
        <CardFooter className="ImageUploadCardFooter">
        {completedCrop && <Button
            disabled={!completedCrop?.width || !completedCrop?.height}
            onClick={() =>
                {generateImageUrl(previewCanvasRef.current, completedCrop)}
            }
        >
            Crop Image
        </Button>}
        </CardFooter>
    </Card>
  );
}
export default ImageUpload;

