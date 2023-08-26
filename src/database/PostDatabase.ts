import { PostDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts"

  public async findPost(
    q: string | undefined
  ): Promise<PostDB[]> {
    if (q) {
      const result: PostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .where("name", "LIKE", `%${q}%`)

      return result

    } else {
      const result: PostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)

      return result
    }
  }

  public async findPostById(
    id: string
  ): Promise<PostDB | undefined> {
    const [postDB]: PostDB[] | undefined[] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .where({ id })

    return postDB
  }

  public async insertPost(
    newPostDB: PostDB
  ): Promise<void> {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .insert(newPostDB)
  }
}
