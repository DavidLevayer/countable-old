
var accountTableQuery: string =
    "CREATE TABLE IF NOT EXISTS Account("+
    "account_id INTEGER PRIMARY KEY,"+
    "name TEXT NOT NULL);";

export var populationQueries: string[] = [
    accountTableQuery
];