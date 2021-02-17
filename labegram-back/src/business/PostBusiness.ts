import { PostDatabase } from "../data/PostDatabase"
import { Post, PostInputDTO } from "./entities/Post"
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
            if (!input.subtitle || !input.file || !input.tag || !input.collection) {
                throw new CustomError(406, "Missing properties")
            }

            if (!input.token) {
                throw new CustomError(422, "Missing properties")
            }

            const tokenData: AuthenticationData = this.authenticator.getData(input.token)

            const id: string = this.idGenerator.generate()

            const date = dayjs().format('YYYY-MM-DD')
            const newBand: Post = new Post(
                id,
                input.subtitle,
                date,
                input.file,
                input.collection,
                tokenData.id
            )
            await this.postDatabase.insertPost(newBand)
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }

    }
}