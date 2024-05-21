import { sqliteConnection } from "../databases/sqlite3";
import { UserDataType } from "../validations/userSchema";

export type CreateUserDataType = UserDataType & { id: string };

export const userRepository = {
  async createUser(data: CreateUserDataType) {
    try {
      const { id, name, email, password } = data;

      const db = await sqliteConnection();

      const querySQL =
        "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?);";

      await db.run(querySQL, [id, name, email, password]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email: string) {
    try {
      const db = await sqliteConnection();

      const querySQL = "SELECT * FROM users WHERE email = ?;";

      const user = await db.run(querySQL, [email]);

      return user;
    } catch (error) {
      throw error;
    }
  },
};
