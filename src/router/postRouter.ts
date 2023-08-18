import express from "express"
import { ProductBusiness } from "../business/UserBusiness"
import { ProductController } from "../controller/UserController"
import { ProductDatabase } from "../database/UserDatabase"

export const productRouter = express.Router()

const productController = new ProductController(
    new ProductBusiness(
        new ProductDatabase()
    )
)

productRouter.get("/", productController.getProducts)
productRouter.post("/", productController.createProduct)
productRouter.put("/:id", productController.editProduct)
productRouter.delete("/:id", productController.deleteProduct)
