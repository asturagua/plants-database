import path from "path";
import Database from "better-sqlite3";

const dbPath = path.join(process.cwd(), 'database', 'plants.db')
export const plantsDatabase: Database.Database = new Database(dbPath)
