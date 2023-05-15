

### what is that ?
this is simple project with flask and mysql and jwt for authentication as  backend and angular for frontend
### Note:
all the routes are protected with jwt so you need to login first to get the token and then use it in the header of the request

## how to install :
### install the requirements :
```
pip install -r requirements.txt
```

### fill the .env file with your credentials and run the server with :
DB_PASSWORD=<your-db-password></br>
DB_USERNAME=<your-db-username></br>
DB_HOST=<your-db-host></br>
DB_NAME=<your-db-name></br>
JWT_SECRET_KEY=<your-jwt-secret-key>;

### run the sql file in the database folder to create the database and the tables and get the sample data
```sql
mysql -u <your-db-username> -p <your-db-name> < database.sql
```