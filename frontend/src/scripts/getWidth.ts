export default function getWidth() : number{
    const bind = document.querySelector.bind(document) as any 

    const elemento = 'body'
    const width = bind(elemento).clientWidth

    return width
}