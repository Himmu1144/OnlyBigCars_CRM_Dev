import psycopg2

conn = psycopg2.connect(
    database="",
    user="your_postgres_username",
    password="your_postgres_password",
    host="localhost",
    port="5432"
)
print("Database connected successfully")