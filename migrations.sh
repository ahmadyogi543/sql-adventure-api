#!/bin/bash

if [ "$#" -ne 3 ]; then
    echo "usage: $0 <migration_name> <direction> <db_name>"
    exit 1
fi

# define the path to the SQL file
MIGRATION_NAME=$1
DIRECTION=$2

SQL_FILEPATH="src/data/migrations/${MIGRATION_NAME}_table_${DIRECTION}.sql"

# check if the SQL file exists
if [ ! -f "$SQL_FILEPATH" ]; then
    echo "error: file '$SQL_FILEPATH' does not exist"
    exit 1
fi

# define the SQLite database path
DB_FILEPATH="src/data/bin/$3"

# run the SQL script on the SQLite database
sqlite3 $DB_FILEPATH < "$SQL_FILEPATH"

# check if the command was successful
if [ $? -eq 0 ]; then
    echo "migration applied successfully"
else
    echo "error when applying migration"
    exit 1
fi