import { Request, Response } from "express"
import { ZodError } from "zod"
import { UserBusiness } from "../business/UserBusiness"
import { SignUpSchema } from "../dtos/signUp"
import { BaseError } from "../errors/BaseError"

export class UserController {
  constructor (
    private userBusiness: UserBusiness
  ){}

  public signUp = async (req: Request, res: Response) => {
    try {

      const input = SignUpSchema.parse({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      })

      
      const output = await this.userBusiness.signUp(input)

      res.status(201).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}