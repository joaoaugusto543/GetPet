import User from './User'

export default interface InitialStateUser{
    user:null | User,
    error:null | string | string[],
    success:boolean,
    loading:boolean
}