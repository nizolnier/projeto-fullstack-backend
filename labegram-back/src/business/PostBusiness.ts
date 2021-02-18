import { PostDatabase } from "../data/PostDatabase"
import { Post, PostInputDTO, Tag } from "./entities/Post"
import { AuthenticationData } from "./entities/User"
import { CustomError } from "./error/CustomError"
import { Authenticator } from "./services/Authenticator"
import { IdGenerator } from "./services/IdGenerator"
import dayjs from 'dayjs'

export class PostBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private postDatabase: PostDatabase
    ) { }

    public createPost = async (
        input: PostInputDTO,
    ): Promise<void> => {
        try {
            if (!input.subtitle || !input.file || !input.tag || !input.collection || !input.token) {
                throw new CustomError(422, "Missing properties")
            }


            const tokenData: AuthenticationData = this.authenticator.getData(input.token)

            const idPost: string = this.idGenerator.generate()
            const idTag: string = this.idGenerator.generate()

            const date = dayjs().format('YYYY-MM-DD')

            const newTag: Tag = {
                id: idTag,
                authorId: tokenData.id,
                tags: input.tag
            }

            const newPost: Post = new Post(
                idPost,
                input.subtitle,
                date,
                input.file,
                input.collection,
                tokenData.id
            )
            await this.postDatabase.insertPost(newPost, newTag)
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }

    }
}