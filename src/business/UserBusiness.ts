import { UserDatabase } from "../database/UserDatabase"
import { SignUpInputDTO, SignUpOutputDTO } from "../dtos/signUp"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { User, UserDB } from "../models/User"

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase
  ) { }

  public signUp = async (input: SignUpInputDTO): Promise<SignUpOutputDTO> => {
    const { id,  name, email, password, role } = input

    const userDBExists = await this.userDatabase.checkEmailIsValid(email)

    if (userDBExists) {
      throw new BadRequestError("'email' já existe")
    }

    const newUser = new User(
      id,
      name,
      email,
      password,
      role,
      new Date().toISOString()
    )

    const newUserDB: UserDB = {
      id: newUser.getId(),
      name: newUser.getName(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      role: newUser.getRole(),
      created_at: newUser.getCreatedAt()
    }

    await this.userDatabase.signUp(newUserDB)

    const output: SignUpOutputDTO = {
      message: "Usuario cadastrado com sucesso",
      user: {
        id: newUser.getId(),
        name: newUser.getName(),
        email: newUser.getEmail(),
        password: newUser.getPassword(),
        role: newUser.getRole(),
        createdAt: newUser.getCreatedAt()
      }
    }

    return output
  }
}
  /* public createProduct = async (input: CreateProductInputDTO): Promise<CreateProductOutputDTO> => {

    const { id, name, price } = input

    const productDBExists = await this.userDatabase.findProductById(id)

    if (productDBExists) {
      throw new BadRequestError("'id' já existe")
    }

    const newProduct = new Product(
      id,
      name,
      price,
      new Date().toISOString()
    )

    const newProductDB: ProductDB = {
      id: newProduct.getId(),
      name: newProduct.getName(),
      price: newProduct.getPrice(),
      created_at: newProduct.getCreatedAt()
    }

    await this.userDatabase.insertProduct(newProductDB)

    const output: CreateProductOutputDTO = {
      message: "Produto registrado com sucesso",
      product: {
        id: newProduct.getId(),
        name: newProduct.getName(),
        price: newProduct.getPrice(),
        createdAt: newProduct.getCreatedAt()
      }
    }

    return output
  }

  public getProducts = async (input: any) => {
    const { q } = input

    const productsDB = await this.userDatabase.findProducts(q)

    const products: Product[] = productsDB.map((productDB) => new Product(
      productDB.id,
      productDB.name,
      productDB.price,
      productDB.created_at
    ))

    const output = products.map((product) => ({
      id: product.getId(),
      name: product.getName(),
      price: product.getPrice(),
      created_at: product.getCreatedAt()
    }))

    return output
  }

  public editProduct = async (input: EditProductInputDTO): Promise<EditProductOutputDTO> => {

    const {
      idToEdit,
      id,
      name,
      price
    } = input

    const productToEditDB = await this.userDatabase.findProductById(idToEdit)

    if (!productToEditDB) {
      throw new NotFoundError("'id' para editar não existe")
    }

    const product = new Product(
      productToEditDB.id,
      productToEditDB.name,
      productToEditDB.price,
      productToEditDB.created_at
    )

    id && product.setId(id)
    name && product.setName(name)
    price && product.setPrice(price)

    const updatedProductDB: ProductDB = {
      id: product.getId(),
      name: product.getName(),
      price: product.getPrice(),
      created_at: product.getCreatedAt()
    }

    await this.userDatabase.updateProduct(idToEdit, updatedProductDB)

    const output: EditProductOutputDTO = {
      message: "Produto editado com sucesso",
      product: {
        id: product.getId(),
        name: product.getName(),
        price: product.getPrice(),
        createdAt: product.getCreatedAt()
      }
    }

    return output
  }

  public deleteProduct = async (input: any) => {
    const { idToDelete } = input

    const productToDeleteDB = await this.userDatabase.findProductById(idToDelete)

    if (!productToDeleteDB) {
      throw new NotFoundError("'id' para deletar não existe")
    }

    const product = new Product(
      productToDeleteDB.id,
      productToDeleteDB.name,
      productToDeleteDB.price,
      productToDeleteDB.created_at
    )

    await this.userDatabase.deleteProductById(productToDeleteDB.id)

    const output = {
      message: "Produto deletado com sucesso",
      product: {
        id: product.getId(),
        name: product.getName(),
        price: product.getPrice(),
        createdAt: product.getCreatedAt()
      }
    }

    return output
  } */

