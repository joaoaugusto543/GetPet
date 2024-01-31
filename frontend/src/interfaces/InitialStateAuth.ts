import User from './User'

export default interface InitialStateAuth{
    token:string | null,
    user:User | null,
    loading:boolean,
    error:string | null | string[] | unknown,
    success:boolean,
    code?:string | null
}