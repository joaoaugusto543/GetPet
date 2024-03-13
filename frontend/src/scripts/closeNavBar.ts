import getWidth from './getWidth'

export default function closeNavBar(){

    const width = getWidth()

    if(width>960){
        return
    }

    const navBar = document.querySelector('#navBar') as HTMLElement

    navBar.style.transform='translateX(-110%)'
}