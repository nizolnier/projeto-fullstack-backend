import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "./error/CustomError";
import { LoginInputDTO, User, UserInputDTO } from "./entities/User";
import { Verifier } from "./services/Verifier";

export class UserBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private verifier: Verifier,
        private userDatabase: UserDatabase,
    ) { }

    async createUser(user: UserInputDTO) {
        try {

            if (!user.name || !user.email || !user.password || !user.nickname || !user.profilePicture) {
                throw new CustomError(406, "Please provide a 'name', an 'email', a 'nickname', a 'password' and a 'profilePicture'")
            }

            this.verifier.verifyEmail(user.email)
            this.verifier.verifyPassword(user.password)

        
            const id = this.idGenerator.generate()

            const hashPassword = await this.hashManager.hash(user.password)

            const newUser: User = new User(id,
                user.name,
                user.email,
                user.nickname,
                hashPassword,
                user.profilePicture)

            await this.userDatabase.insertUser(newUser)

            const accessToken = this.authenticator.generateToken({
                id,
            })

            return accessToken
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

    async getUserByEmail(user: LoginInputDTO) {
        try {
            if(!user.email || !user.password){
                throw new CustomError(406, "Please provide  an 'email' and a 'password'")
            }

            this.verifier.verifyEmail(user.email)
            this.verifier.verifyPassword(user.password)

            const userFromDB = await this.userDatabase.selectUserByEmail(user.email)

            if (!userFromDB) {
                throw new CustomError(401, "Invalid credentials!")
            }

            const userPassword: string = userFromDB.getPassword()

            const passwordIsCorrect = await this.hashManager.compare(
                user.password,
                userPassword
            )

            const id: string = userFromDB.getId()

            const accessToken = this.authenticator.generateToken({ id })

            if (!passwordIsCorrect) {
                throw new CustomError(401, "Invalid credentials!")
            }

            return accessToken

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }

    }
}