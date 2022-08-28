import json
import csv
from os import listdir, path as os_path
import mysql.connector

import argparse

parser = argparse.ArgumentParser(description='Convert Backendless CSV Schema to mysql 8.0 Schema.')
parser.add_argument("-p", "--schema_path", help="schema files that are exported from backendless \"Manage > Export\" page.", default="./")
parser.add_argument("-d", "--drop_tables", help="drop tables that hold same names as CSV files.", action="store_true")
parser.add_argument("--utf8mb4", help="set default characters encoding to utf8mb4", action="store_true")
args = parser.parse_args()

host="voomcar-db-mysql.mysql.database.azure.com"
user="voomcarDBAdmin@voomcar-db-mysql"
password="2$c%YKN8vsU4jqG07SG7EkBX9T"
database="voomcar"

# when true all tables with the same names will be dropped before a new ones are created
drop_existing_tables = args.drop_tables
path = args.schema_path
set_to_utf8mb4 = args.utf8mb4
mydb = mysql.connector.connect(
  host=host,
  user=user,
  password=password,
  database=database
)

if not mydb.is_connected():
    if input('couldn\'t connect to the db, do you want to continue? (y/n)') != "y":
            sys.exit()

filenames = listdir(path)
files = [ filename for filename in filenames if filename.endswith(".csv") ]

if len(files) == 0:
    sys.exit('No Backendless Schema Files are found in the given path: ' + args.schema_path )
# select table
commands = "USE " + database + ";\n"

#to be able to reference a table before it's even created.
commands += "SET foreign_key_checks = 0;\n"

if set_to_utf8mb4:
    commands += "\nALTER DATABASE\n" + database + "\nCHARACTER SET = utf8mb4\nCOLLATE = utf8mb4_unicode_ci;\n\n"
 
def constraints_to_string(constraints):
    if len(constraints) == 0:
        return ""
    stringConstraints = ""
    addIndex = False
    for constraint in constraints:
       if constraint == "NN":
            constraint = "NOT NULL"
       if constraint == "UQ":
            constraint = "UNIQUE"
       if constraint == "IDX":
            addIndex = True
       if not addIndex:
            stringConstraints +=  " " + str(constraint)
    if addIndex:
       stringConstraints += ",\n INDEX (`" + column + "`)"
    return stringConstraints

def map_data_type(data, column, constraints):
    dataType = data["type"]
    if column == "ownerId":
        dataType = "BINARY(16) " + constraints + ", " + \
        " FOREIGN KEY (`" + column + "`) REFERENCES `users`(`objectId`)"
    elif dataType == "STRING":
        dataSize = data.get("dataSize")
        dataType = "NVARCHAR(" + str(dataSize) + ") " + constraints
    elif dataType == "STRING_ID":
        dataType = "BINARY(16) NOT NULL PRIMARY KEY " + constraints
    elif dataType == "RELATION":
        dataType = "BINARY(16) " + constraints + ", " + \
        "FOREIGN KEY (`" + column + "`) REFERENCES `" + data["relatedTable"] + "`(`objectId`)"
    elif dataType == "FILE_REF":
        dataSize = data.get("dataSize")
        dataType = "NVARCHAR(" + str(dataSize) + ") " + constraints
    else:
        dataType += " " + constraints
    return dataType
    

# drop tables.
if drop_existing_tables:
    for file in files:
        table_name = file.rpartition('.')[0]
        commands += "DROP TABLE IF EXISTS " + table_name + ";\n"
    commands += "\n"
    
# generate SQL scripts from backendless schema csv file.
for file in files:
    file_path = os_path.join(args.schema_path, file)
    row = next(csv.reader(open(file_path)))
    table_name = file.rpartition('.')[0]
    variablesString = ""
    first=True
    for f in row:
        column,_,rest = f.partition('(')
        data = json.loads(rest[:-1])
        
        constraints = constraints_to_string(data.get("constraints"))
        dataType = map_data_type(data, column, constraints)
            
        if not first:
            variablesString +=  ", \n"
       
        variablesString += "`" + column + "`" + " " + dataType
        first = False        
    commands += "CREATE TABLE IF NOT EXISTS " + table_name + " (" + variablesString + ");\n\n"
    commands += "ALTER TABLE " + table_name + " CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin\n\n"
print(commands)
if input("are you sure you want to execute the SQL script above? (y/n)") == "y":
    mycursor = mydb.cursor()
    mycursor.execute(commands, multi=True)
    mydb.commit()
    mydb.disconnect()
    print("queries has been comitted.")