import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users"

  public async signUp(newUserDB: UserDB) {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .insert(newUserDB)
  }

  public async login(/* id: string */) {
    /* const [productDB]: ProductDB[] | undefined[] = await BaseDatabase
      .connection(ProductDatabase.TABLE_USERS)
      .where({ id })

    return productDB */
  }

  public async checkEmailIsValid(id: string) {
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .where({ id })

    return userDB
  }
}
