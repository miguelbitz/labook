import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dto"
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/post/getPosts.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import jwt from 'jsonwebtoken'
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto"
import { NotFoundError } from "../errors/NotFoundError"

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
      content: content
    }

    return output;
  }

  public editPost = async (
    input: EditPostInputDTO
  ): Promise<EditPostOutputDTO> => {
    const { id, content, token } = input

     const payload = this.tokenManager.getPayload(token);

    if (!payload) {
        throw new BadRequestError("Token inválido");
    }

    const postDB = await this.postDatabase.findPostById(id);

    if (!postDB) {
        throw new NotFoundError("Post não encontrado");
    }

    if (postDB.creator_id !== payload.id) {
        throw new BadRequestError("Você não tem permissão para editar este post");
    }

    const updateTime = new Date().toISOString()

    await this.postDatabase.editPost(id, content, updateTime)

    const output: EditPostOutputDTO = {
      message: "Post editado com sucesso",
      content: content
    }

    return output;
  }

}