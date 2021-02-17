export class User {

    constructor(
        private id: string,
        private name: string,
        private email: string,
        private nickname: string,
        private password: string,
        private profilePicture: string
    ) { }

    public getId = (): string => this.id
    public getName = (): string => this.name
    public getEmail = (): string => this.email
    public getNickname = (): string => this.nickname
    public getPassword = (): string => this.password
    public getProfilePicture = (): string => this.profilePicture
    
}



export interface UserInputDTO {
    name: string;
    email: string;
    password: string;
    nickname: string;
    profilePicture: string;
}

export interface LoginInputDTO {
    email: string;
    password: string;
}

export interface AuthenticationData {
    id: string;
}