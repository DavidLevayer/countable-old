const accountTableQuery: string =
    "CREATE TABLE IF NOT EXISTS Account(" +
    "accountId INTEGER PRIMARY KEY," +
    "name TEXT NOT NULL);";

export const populationQueries: string[] = [
    accountTableQuery,
];
