import { Crop } from 'react-image-crop'

export function configImage (canvasRef:any, image64:any,previewImage:File | string, pixelCrop:Crop,height:number,width:number) {

    const canvas = canvasRef

    const scaleX = image64.naturalWidth / 400

    const scaleY = image64.naturalHeight / 400

    const ctx = canvas.getContext('2d')

    const pixelRatio = window.devicePixelRatio

    canvas.width = pixelCrop.width * pixelRatio * scaleX

    canvas.height = pixelCrop.height * pixelRatio * scaleY

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    const image = new Image()

    if(typeof(previewImage) === 'string'){

      image.src=previewImage

    }else{

      image.src = URL.createObjectURL(previewImage)
      
    }
    
    image.onload = function () {

      ctx.drawImage(
        image,
        pixelCrop.x * scaleX,
        pixelCrop.y * scaleY,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY,
        0,
        0,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY
      )
    }

  }
