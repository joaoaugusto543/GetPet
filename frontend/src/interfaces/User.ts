export default interface User{
    _id:string
    name:string,
    email:string,
    password?:string,
    confirmPassword?:string,
    uf:string,
    city:string,
    checked:boolean,
    profileImage?: File | null | string,
    phone?:string
}