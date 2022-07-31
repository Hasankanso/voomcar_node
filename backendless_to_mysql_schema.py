import json
import csv
from os import listdir
import mysql.connector

host="voomcar-db-mysql.mysql.database.azure.com"
user="voomcarDBAdmin@voomcar-db-mysql"
password="2$c%YKN8vsU4jqG07SG7EkBX9T"
database="voomcar"

# when true all tables with the same names will be dropped before a new ones are created
drop_existing_tables = False
mydb = mysql.connector.connect(
  host=host,
  user=user,
  password=password,
  database=database
)

path = "./"
filenames = listdir(path)
files = [ filename for filename in filenames if filename.endswith(".csv") ]

# select table
commands = "USE " + database + ";\n"

#to be able to reference a table before it's even created.
commands += "SET foreign_key_checks = 0;\n"

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
        dataType = "VARCHAR(" + str(dataSize) + ") " + constraints
    elif dataType == "STRING_ID":
        dataType = "BINARY(16) NOT NULL PRIMARY KEY " + constraints
    elif dataType == "RELATION":
        dataType = "BINARY(16) " + constraints + ", " + \
        "FOREIGN KEY (`" + column + "`) REFERENCES `" + data["relatedTable"] + "`(`objectId`)"
    elif dataType == "FILE_REF":
        dataType = "VARCHAR(256) " + constraints
    else:
        dataType += " " + constraints
    return dataType
    

# drop tables.
if drop_existing_tables:
    for file in files:
        tableName = file.rpartition('.')[0]
        commands += "DROP TABLE IF EXISTS " + tableName + ";\n"
    commands += "\n"

# generate SQL scripts from backendless schema csv file.
for file in files:
    row = next(csv.reader(open(file)))
    tableName = file.rpartition('.')[0]
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
    commands += "CREATE TABLE IF NOT EXISTS " + tableName + " (" + variablesString + ");\n\n"
 
print(commands)
mycursor = mydb.cursor()
results = mycursor.execute(commands, multi=True)
if input("are you sure you want to execute the SQL script above? (y/n)") != "y":
    mydb.commit()