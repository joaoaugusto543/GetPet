export default interface DataUpdateUser{
    [key:string]:any,
    name:string,
    uf:string,
    city:string,
    profileImage?: File,
    phone?:string
}