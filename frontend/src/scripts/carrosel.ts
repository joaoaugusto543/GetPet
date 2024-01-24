export default function carrosel(){

   const imgs=document.querySelectorAll('#carrosel > img') as NodeList

   const arrows=document.querySelectorAll('#carrosel svg') as NodeList

   let index=0 as number

   let back= false as boolean

   const imagesArray=Array.from(imgs) as HTMLElement[]

   const [left,right]=Array.from(arrows) as HTMLElement[]

   function passImage(){
   
       index ++
       
       if(imagesArray[index] && !back){

            const percent= -100 // -100%
           
           imagesArray.map((img)=>{
            img.style.transform=`translateX(${index * percent}%)`
           })

       }else{

            back=true

            index-=2 

            const percent= 50 // 50%
            
            imagesArray.map((img)=>{
                
                const translateX=parseInt(img.style.transform.replace('translateX(','').replace('%)',''))
                
                return img.style.transform=`translateX(${translateX + percent}%)`
            })

            if(index === 0){
                back=false
            }

       }

   }

   function handleLeft(){

        if(index !== 0){

            index--

            const percent= 100 // 100%

            imagesArray.map((img)=>{

                const translateX=parseInt(img.style.transform.replace('translateX(','').replace('%)',''))

                return img.style.transform=`translateX(${translateX + percent}%)`
            })

        }

   }

   function handleRight(){
        if(index < imgs.length -1){

            index++

            const percent= -100 // -100%

            imagesArray.map((img)=>{
                img.style.transform=`translateX(${index * percent}%)`
            })
            
        }
   }


   if(imagesArray.length > 1){
    
        const interval=setInterval(()=>{
            passImage()
        },1800)

        left.addEventListener('click',()=>{clearInterval(interval)})
        right.addEventListener('click',()=>{clearInterval(interval)})
            
        left.onclick= handleLeft

        right.onclick= handleRight
   }


}