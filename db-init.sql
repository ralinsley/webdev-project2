-- Create Unforget database and user. Ensure Unicode is fully supported.
CREATE DATABASE IF NOT EXISTS project2 CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
GRANT ALL PRIVILEGES ON project2.* TO p2_user@localhost;

