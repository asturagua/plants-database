import path from "path";
import sqlite3, {Database} from "sqlite3";

const dbPath = path.join(process.cwd(), 'database', 'plants.db')
export const plantsDatabase: Database = new sqlite3.Database(dbPath);

