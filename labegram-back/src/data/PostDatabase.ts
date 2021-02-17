import { Post } from "../business/entities/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    private static tableName: string = 'Posts_Labegram'
  
    public async insertPost(post: Post) {
      try {
        await BaseDatabase.connection(PostDatabase.tableName)
          .insert({
            id: post.getId(),
            subtitle: post.getSubtitle(),
            date: post.getDate(),
            file: post.getFile(),
            collection: post.getCollection(),
            author_id: post.getAuthorId()
        })
      } catch (error) {
        throw new Error(error.sqlMessage);
      }
    }

}