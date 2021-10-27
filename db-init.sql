-- Remove any existing database and user.
DROP DATABASE IF EXISTS project2;
DROP USER IF EXISTS p2-user@localhost;

-- Create Unforget database and user. Ensure Unicode is fully supported.
CREATE DATABASE project2 CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER p2-user@localhost IDENTIFIED WITH mysql_native_password BY 'Webdev!';
GRANT ALL PRIVILEGES ON project2.* TO p2-user@localhost;




-- DROP DATABASE IF EXISTS follownet_database;
-- DROP TABLE IF EXISTS humans;
-- DROP TABLE IF EXISTS followers;

-- CREATE DATABASE follownet_database;

-- CREATE TABLE humans (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR,
--     screenname VARCHAR
-- );

-- CREATE TABLE followers (
--     followerId INT,
--     followeeId INT PRIMARY KEY 
--     FOREIGN KEY (followerId) REFERENCES humans(id)
--     FOREIGN KEY (followeeId) REFERENCES humans(id)

-- );