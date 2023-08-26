import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dto"
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/post/getPosts.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import jwt from 'jsonwebtoken'

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private userDatabase: UserDatabase
  ) { }

  public getPosts = async (
    input: GetPostsInputDTO
): Promise<GetPostsOutputDTO> => {
    const { q, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
        throw new BadRequestError("Token inválido");
    }

    const postsDB = await this.postDatabase.findPost(q);

    const posts = await Promise.all(postsDB.map(async (postDB) => {
        const post = new Post(
            postDB.id,
            postDB.creator_id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
        );

        const creatorName = payload.name ?? "Nome Desconhecido";
        return post.toPostDetails(creatorName);
    }));

    const output: GetPostsOutputDTO = posts;

    return output;
}



  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { content, token } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const id = this.idGenerator.generate()

    const creatorId = payload.id ?? "Id Desconhecido";

    const newPost = new Post(
      id,
      creatorId,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
    );

    const newPostDB = newPost.toDBModel()
    await this.postDatabase.insertPost(newPostDB)

    const output: CreatePostOutputDTO = {
      message: "Post publicado com sucesso",
      post: content
    }

    return output;
  }

}