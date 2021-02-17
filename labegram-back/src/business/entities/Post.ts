export class Post {

    constructor(
        private id:string,
        private subtitle:string,
        private date:string,
        private file: string,
        private collection:string,
        private authorId:string
    ) {}
    
    public getId = ():string => this.id
    public getSubtitle = ():string => this.subtitle
    public getDate = ():string => this.date
    public getFile = ():string => this.file
    public getCollection = ():string => this.collection
    public getAuthorId = ():string => this.authorId  
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
    tags: string;
}