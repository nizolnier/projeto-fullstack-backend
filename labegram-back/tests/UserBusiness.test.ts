import { LoginInputDTO, User, UserInputDTO } from "../src/business/entities/User"
import { UserBusiness } from "../src/business/UserBusiness"

describe("Testando Sign Up", () => {
    const idGenerator = { generate: jest.fn() } as any
    const hashManager = { hash: jest.fn() } as any
    const authenticator = { generateToken: jest.fn() } as any
    const verifier = { verifyEmail: jest.fn(), verifyPassword: jest.fn() } as any
    const userDatabase = { insertUser: jest.fn() } as any

    test("Error when 'name' is empty", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            verifier,
            userDatabase
        )

        const input: UserInputDTO = {
            name: "",
            email: "test@email.com",
            nickname: "testinho",
            password: "testando123",
            profilePicture: "https://picsum.photos/200/300"
        }

        try {
            await userBusiness.createUser(input)

        } catch (error) {
            expect(error.message).toBe("Please provide a 'name', an 'email', a 'nickname', a 'password' and a 'profilePicture'")
            expect(error.statusCode).toBe(406)
        }
    })


    test("Error when 'password' is less than 6", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            verifier,
            userDatabase
        )


        const input: UserInputDTO = {
            name: "Teste",
            email: "test@email.com",
            nickname: "testinho",
            password: "testa",
            profilePicture: "https://picsum.photos/200/300"
        }

        try {
            await userBusiness.createUser(input)

        } catch (error) {
            expect(error.message).toBe("Invalid password. Make sure it has more than 6 characters")
            expect(error.statusCode).toBe(422)
        }
    })


    test("Error when email is invalid", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            verifier,
            userDatabase
        )


        const input: UserInputDTO = {
            name: "Teste",
            email: "test.com",
            nickname: "testinho",
            password: "testando123",
            profilePicture: "https://picsum.photos/200/300"
        }

        try {
            await userBusiness.createUser(input)

        } catch (error) {
            expect(error.message).toBe("Invalid email")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Success case", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            verifier,
            userDatabase
        )

        const input: UserInputDTO = {
            name: "Teste",
            email: "test@email.com",
            nickname: "testinho",
            password: "testando123",
            profilePicture: "https://picsum.photos/200/300"
        }

        try {
            await userBusiness.createUser(input)

            expect(userDatabase.createUser).toHaveBeenCalled()
            expect(userDatabase.createUser).toHaveBeenCalledWith(input)
        } catch (error) {

        }
    })
})

const selectUserByEmailUndefinedMock = jest.fn((email: any): any => {
    return undefined
})

const selectUserByEmailMock = jest.fn((email: any): any => {
    return new User("id",
        "test",
        "test@email.com",
        "testinho",
        "testando123",
        "https://picsum.photos/200/300"
    )
})

const compareTrue = jest.fn((password: any, hashPassowrd: any): any => {
    return true
})

const compareFalse = jest.fn((password: any, hashPassowrd: any): any => {
    return false
})


describe("Testando login", () => {
    const idGenerator = { generate: jest.fn() } as any
    const hashManagerTrue = { compare: compareTrue } as any
    const hahsManagerFalse = { compare: compareFalse } as any
    const authenticator = { generateToken: jest.fn() } as any
    const verifier = { verifyEmail: jest.fn(), verifyPassword: jest.fn() } as any
    const userDatabaseTrue = { selectUserByEmail: selectUserByEmailMock } as any
    const userDatabaseFalse = { selectUserByEmail: selectUserByEmailUndefinedMock } as any

    test("Error when 'email' is empty", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            verifier,
            userDatabaseTrue
        )


        const input: LoginInputDTO = {
            email: "",
            password: "testando123"
        }

        try {
            await userBusiness.getUserByEmail(input)

        } catch (error) {
            expect(error.message).toBe("Please provide  an 'email' and a 'password'")
            expect(error.statusCode).toBe(406)
        }
    })

    test("Error when 'password' is empty", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            verifier,
            userDatabaseTrue
        )

        const input: LoginInputDTO = {
            email: "test@email.com",
            password: ""
        }

        try {
            await userBusiness.getUserByEmail(input)

        } catch (error) {
            expect(error.message).toBe("Please provide  an 'email' and a 'password'")
            expect(error.statusCode).toBe(406)
        }
    })

    test("Error when 'email' is invalid", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            verifier,
            userDatabaseTrue
        )

        const input: LoginInputDTO = {
            email: "testemail.com",
            password: "testando123"
        }

        try {
            await userBusiness.getUserByEmail(input)

        } catch (error) {
            expect(error.message).toBe("Invalid email")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when user not found", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            verifier,
            userDatabaseFalse
        )


        const input: LoginInputDTO = {
            email: "test@email.com",
            password: "testando123"
        }

        try {
            await userBusiness.getUserByEmail(input)

        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Invalid credentials!")
        }
    })

    test("Error when password is incorrect", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hahsManagerFalse,
            authenticator,
            verifier,
            userDatabaseTrue
        )

        const input: LoginInputDTO = {
            email: "test@email.com",
            password: "testando123"
        }

        try {
            await userBusiness.getUserByEmail(input)

        } catch (error) {
            expect(error.message).toBe("Invalid credentials!")
            expect(error.statusCode).toBe(401)
        }
    })

    test("Success case", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            verifier,
            userDatabaseTrue
        )

        const input: LoginInputDTO = {
            email: "test@email.com",
            password: "testando123"
        }

        try {
            await userBusiness.getUserByEmail(input)

            expect(userDatabaseTrue.selectUserByEmail).toHaveBeenCalled()
            expect(userDatabaseTrue.selectUserByEmail).toHaveBeenCalledWith(input.email)
            expect(userBusiness.getUserByEmail).toHaveReturned()

        } catch (error) {

        }
    })
})