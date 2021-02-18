import dayjs from "dayjs"
import { Post, PostInputDTO, Tag } from "../src/business/entities/Post"
import { PostBusiness } from "../src/business/PostBusiness"

describe("Create Image", () => {
    const idGenerator = { generate: jest.fn() } as any
    const authenticator = { getData: jest.fn(() => ({ id: "id" })) } as any
    const postDatabase = { insertPost: jest.fn() } as any

    test("Error when 'subtitle' is empty", async () => {
        const postBusiness: PostBusiness = new PostBusiness(
            idGenerator,
            authenticator,
            postDatabase
        )

        const input = {
            token: "tokenTest",
            subtitle: "",
            file: "https://teste",
            tag: ["#teste, #test"],
            collection: "Testing"
        }

        try {
            await postBusiness.createPost(input)

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when 'file' is empty", async () => {
        const postBusiness: PostBusiness = new PostBusiness(
            idGenerator,
            authenticator,
            postDatabase
        )

        const input = {
            token: "tokenTest",
            subtitle: "Test",
            file: "",
            tag: ["#teste, #test"],
            collection: "Testing"
        }

        try {
            await postBusiness.createPost(input)

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when 'tag' is empty", async () => {
        const postBusiness: PostBusiness = new PostBusiness(
            idGenerator,
            authenticator,
            postDatabase
        )

        const input = {
            token: "tokenTest",
            subtitle: "Test",
            file: "https://teste",
            tag: [],
            collection: "Testing"
        }

        try {
            await postBusiness.createPost(input)

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when 'collection' is empty", async () => {
        const postBusiness: PostBusiness = new PostBusiness(
            idGenerator,
            authenticator,
            postDatabase
        )

        const input = {
            token: "tokenTest",
            subtitle: "Test",
            file: "https://teste",
            tag: ["#teste, #test"],
            collection: ""
        }

        try {
            await postBusiness.createPost(input)

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Success case", async () => {
        const postBusiness: PostBusiness = new PostBusiness(
            idGenerator,
            authenticator,
            postDatabase
        )

        const input: PostInputDTO = {
            token: "tokenTest",
            subtitle: "Test",
            file: "https://teste",
            tag: ["#teste, #test"],
            collection: "Testing"
        }

        const inputImage = new Post(
            idGenerator,
            input.subtitle,
            dayjs().format('YYYY-MM-DD'),
            input.file,
            input.collection,
            authenticator.id
        )

        const inputTags: Tag = {
            id: idGenerator,
            authorId: authenticator.id,
            tags: input.tag
        }

        try {
            await postBusiness.createPost(input)

            expect(postDatabase.createPost).toHaveBeenCalled()
            expect(postDatabase.createPost).toHaveBeenCalledWith(
                inputImage,
                inputTags
            )

        } catch (error) {

        }
    })

})