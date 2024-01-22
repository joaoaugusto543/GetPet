function reduceNavBar(){
    const navBar=document.querySelector('#navBar') as HTMLInputElement

    
    function reduce(){
        if(navBar){
            if(window.scrollY !== 0){
                navBar.style.height='140px'
            }else{
                navBar.style.height=''
            }
        }
    }

    window.addEventListener('scroll',reduce)
}

export default reduceNavBar