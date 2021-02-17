import { User } from "../business/entities/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private static tableName: string = 'Users_Labegram'
    
    public async insertUser(user: User): Promise<void> {
      try {
        await BaseDatabase.connection(UserDatabase.tableName)
          .insert({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            nickname: user.getNickname(),
            password: user.getPassword(),
            profile_picture: user.getProfilePicture()
          })
      } catch (error) {
        throw new Error(error.sqlMessage);
      }
    }
  
    public async selectUserByEmail(email: string): Promise<User | null> {
      try {
        const result = await BaseDatabase.connection(UserDatabase.tableName)
          .select("*")
          .where({ email })
  
        return new User(
          result[0].id,
          result[0].name,
          result[0].email,
          result[0].nickname,
          result[0].password,
          result[0].profile_picture
        )
  
      } catch (error) {
        throw new Error(error.sqlMessage);
      }
    }
  }
