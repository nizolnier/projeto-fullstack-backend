import dayjs from "dayjs";
import { Post, PostFinal, Tag } from "../business/entities/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  private static baseTableName: string = 'Posts_Labegram'
  private static secondTable: string = 'Tags_Labegram'
  private static relationTable: string = 'PostTags_Labegram'

  private static toPostModel(post: any): PostFinal {
    return new PostFinal(
      post.id,
      post.subtitle,
      dayjs(post.date).format('DD/MM/YYYY'),
      post.file,
      post.collection,
      post.tag,
      post.author_id,
      post.nickname,
      post.profile_picture
    )
  }

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

  public async selectAll(): Promise<any> {
    try {
      const result = await BaseDatabase.connection.raw(`
        SELECT post.id, 
        post.subtitle,
        post.date,
        post.file,
        post.collection,
        tag.tag,
        post.author_id, 
        users.nickname,
        users.profile_picture FROM Posts_Labegram post
        RIGHT JOIN Users_Labegram users
        ON post.author_id =  users.id
        LEFT JOIN Tags_Labegram tag
        ON tag.author_id = post.author_id
        JOIN PostTags_Labegram pt
        ON pt.post_id = post.id
        AND pt.tag_id = tag.id
        ORDER BY date DESC;
      `)

      let postArray: PostFinal[] = []

      for (let item of result[0]) {
        postArray.push(PostDatabase.toPostModel(item))
      }

      return postArray

    } catch (error) {
      throw new Error(error.sqlmessage || error.message);
    }
  }

  public async selectById(id: string): Promise<any> {
    try {
      const result = await BaseDatabase.connection.raw(`
        SELECT post.id, 
        post.subtitle,
        post.date,
        post.file,
        post.collection,
        tag.tag,
        post.author_id, 
        users.nickname,
        users.profile_picture FROM Posts_Labegram post
        RIGHT JOIN Users_Labegram users
        ON post.author_id =  users.id
        LEFT JOIN Tags_Labegram tag
        ON tag.author_id = post.author_id
        JOIN PostTags_Labegram pt
        ON pt.post_id = post.id
        AND pt.tag_id = tag.id
        WHERE post.id = "${id}"
        ORDER BY date DESC;
      `)

      return PostDatabase.toPostModel(result[0][0])

    } catch (error) {
      throw new Error(error.sqlmessage || error.message);
    }
  }
}


