import { Request, Response } from "express";
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  

  constructor(
    private createUserUseCase: CreateUserUseCase,
  ){}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      const result = await this.createUserUseCase.execute({name, email, password});

      return res.json({message: "Usuario Criado com sucesso"});

    } catch (error: any) {
        if(error.type === 'alrady Exist'){
          return res.json({ error: error.message })
        }
      return res.status(400).json({error})  
    }
  }
}