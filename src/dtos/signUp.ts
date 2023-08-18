import z from "zod"

export interface SignUpInputDTO {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
}

export interface SignUpOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        password: string,
        role: string,
        createdAt: string
    }
}

export const SignUpSchema = z.object({
    id: z.string().min(1).optional(),
    name: z.string().min(2).optional(),
    email: z.string().min(4).optional(),
    password: z.string().min(8).optional(),
    role: z.string().min(5).optional()
}).transform(data => data as SignUpInputDTO )