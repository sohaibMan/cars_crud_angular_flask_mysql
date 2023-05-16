

### what is that ?
This is simple project with flask and mysql and jwt for authentication as  backend and angular for frontend with angular materials 
### Note:
all the routes are protected with jwt so you need to login first to get the token and then use it in the header of each request request

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
JWT_ACCESS_TOKEN_EXPIRES=<time in minutes>

```
python3 server.py
```

### run the sql file in the database folder to create the database and the tables and get the sample data
```sql
mysql -u <your-db-username> -p <your-db-name> < database.sql
```


### routes 

GET /api/v1/cars (get all cars)</br>
GET /api/v1/cars/{card_id} ( get a car by id)</br>
POST /api/v1/cars ( create a car)</br>
PUT /api/v1/cars ( edit a car by id )</br>
DELETE /api/v1/cars (delete a car by id)</br>
POST /api/v1/login</br>
POST /api/v1/signup</br>


### pages 
/</br>
/cars </br>
/signup</br>
/login</br>



### TODOS :
complete the crud tables in the front end

link the cars table to the users table


