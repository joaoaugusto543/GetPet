export default interface DataCreateUser{
    [key:string]:any,
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
    uf:string,
    city:string,
    profileImage?: File | null,
    phone?:string
}