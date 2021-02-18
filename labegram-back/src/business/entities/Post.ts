export class Post {

    constructor(
        private id: string,
        private subtitle: string,
        private date: string,
        private file: string,
        private collection: string,
        private authorId: string
    ) { }

    public getId = (): string => this.id
    public getSubtitle = (): string => this.subtitle
    public getDate = (): string => this.date
    public getFile = (): string => this.file
    public getCollection = (): string => this.collection
    public getAuthorId = (): string => this.authorId
}

export interface PostInputDTO {
    token: string;
    subtitle: string;
    file: string;
    tag: string[];
    collection: string;
}

export interface Tag {
    id: string;
    authorId: string;
    tags: string[];
}

export interface PostIdInputDTO {
    token: string;
    id: string;
}

export class PostFinal {

    constructor(
        private id: string,
        private subtitle: string,
        private date: string,
        private file: string,
        private collection: string,
        private tags: string[],
        private authorId: string,
        private nickname: string,
        private profilePicture: string
    ) { }

    public getId = (): string => this.id
    public getSubtitle = (): string => this.subtitle
    public getDate = (): string => this.date
    public getFile = (): string => this.file
    public getCollection = (): string => this.collection
    public getTags = (): string[] => this.tags
    public getAuthorId = (): string => this.authorId
    public getNickname = (): string => this.nickname
    public getProfilePicture = (): string => this.profilePicture
}

export interface PostSample {
    id: string,
    subtitle: string,
    file: string,
    tags: string[],
    authorId: string,
    nickname: string,
    profilePicture: string
}