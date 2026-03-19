Portfolio Project



📌 About



This is a simple portfolio contact app built using Node.js and MySQL.Users can submit their name, email, and message.



🛠️ Tech Used



Node.js



Express



MySQL



Dotenv



⚙️ Setup



1\. Install dependencies



npm install



2\. Create .env



DB\_HOST=localhost

DB\_USER=root

DB\_PASSWORD=yourpassword

DB\_NAME=project

PORT=3000



3\. Create database



CREATE DATABASE project;

USE project;



CREATE TABLE messages (

&#x20; id INT AUTO\_INCREMENT PRIMARY KEY,

&#x20; name VARCHAR(100),

&#x20; email VARCHAR(100),

&#x20; message TEXT

);



4\. Run the app



node app.js



Open: http://localhost:3000



📊 View Data in MySQL



To see submitted messages:



SELECT \* FROM messages;



⚡ CI/CD



Uses GitHub Actions.



👩‍💻 Author



Sthuti V K

