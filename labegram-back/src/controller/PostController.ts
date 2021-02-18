import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostIdInputDTO, PostInputDTO } from "../business/entities/Post";
import { Authenticator } from "../business/services/Authenticator";
import { IdGenerator } from "../business/services/IdGenerator";
import { PostDatabase } from "../data/PostDatabase";

const postBusiness = new PostBusiness(
    new IdGenerator(),
    new Authenticator(),
    new PostDatabase()
)

export class PostController {
    public createPost = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: string = req.headers.authorization as string
            const input: PostInputDTO = {
                token: token,
                subtitle: req.body.subtitle,
                file: req.body.file,
                tag: req.body.tag,
                collection: req.body.collection
            }

            await postBusiness.createPost(input)

            res.status(201).send("Post created with success")
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }

    public getAllPosts = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: string = req.headers.authorization as string;

            const result = await postBusiness.getAllPosts(token)

            res.status(200)
                .send(result)

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }

    }

    public getPostById = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: string = req.headers.authorization as string;

            const input: PostIdInputDTO = {
                token: token,
                id: req.params.id
            }

            const result = await postBusiness.getPostById(input)

            res.status(200)
                .send(result)

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }

    }
}