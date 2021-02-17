import { CustomError } from "../error/CustomError"

export class Verifier {

    public async verifyEmail(email: string) {
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        const isEmail = emailRegExp.test(email)

        if (!isEmail) {
            throw new CustomError(422 ,"Invalid email.")
        }
    }

    public async verifyPassword(password: string) {
        if(password.length < 6){
            throw new CustomError(422 ,"Invalid password. Make sure it has more than 6 characters")
        }
    }
}