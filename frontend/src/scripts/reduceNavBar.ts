import getWidth from './getWidth'

function reduceNavBar(){
    const navBar=document.querySelector('#navBar') as HTMLInputElement

    
    function reduce(){

        const width = getWidth()

        if(width <= 1020){
            return
        }

        if(navBar){
            if(window.scrollY !== 0){
                navBar.style.height= parseFloat(navBar.style.height.replace(' px','')) - 10 + 'px'
            }else{
                navBar.style.height=''
            }
        }
    }

    window.addEventListener('scroll',reduce)
    window.addEventListener('resize',reduce)

}

export default reduceNavBar