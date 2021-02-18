import { Post, Tag } from "../business/entities/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  private static baseTableName: string = 'Posts_Labegram'
  private static secondTable: string = 'Tags_Labegram'
  private static relationTable: string = 'PostTags_Labegram'

  public async insertPost(post: Post, tag: Tag) {
    try {
      await BaseDatabase.connection(PostDatabase.baseTableName)
        .insert({
          id: post.getId(),
          subtitle: post.getSubtitle(),
          date: post.getDate(),
          file: post.getFile(),
          collection: post.getCollection(),
          author_id: post.getAuthorId()
        })

      await BaseDatabase.connection(PostDatabase.secondTable)
        .insert({
          id: tag.id,
          author_id: tag.authorId,
          tag: tag.tags
        })

      await BaseDatabase.connection(PostDatabase.relationTable)
        .insert({
          post_id: post.getId(),
          tag_id: tag.id
        })


    } catch (error) {
      throw new Error(error.sqlMessage);
    }
  }

}