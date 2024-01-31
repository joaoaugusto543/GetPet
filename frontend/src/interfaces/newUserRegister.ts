export default interface NewUserRegister{
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
    uf:string,
    city:string,
    phone?:string,
    profileImage?:File
}