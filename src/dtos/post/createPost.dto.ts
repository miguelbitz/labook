import z from "zod"
import { PostDetails, PostModel } from "../../models/Post"

export interface CreatePostInputDTO {
  content: string,
  token: string
}

export interface CreatePostOutputDTO {
  message: string,
  post: string
}

export const CreatePostSchema = z.object({
  content: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as CreatePostInputDTO)