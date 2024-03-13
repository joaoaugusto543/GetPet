import getWidth from './getWidth'

export default function screenSize(){

    const width=getWidth()

    const navBar=document.querySelector('#navBar') as HTMLElement

    if(width>960){
        if(navBar){
            navBar.style.transform=''
        }
        
    }

    window.addEventListener('resize',screenSize)

}
