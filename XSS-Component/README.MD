This file contains the source code for the Cross Site Scripting and Vulnerable component vulnerabilities from the OWASP top 10

Sample running on http://3.138.158.113:3000/ 

Please use the below routes

http://3.138.158.113:3000/vuln_component
http://3.138.158.113:3000/sec_component
http://3.138.158.113:3000/vuln_xss
http://3.138.158.113:3000/sec_xss


The XSS vulnerability is of the stored variety. To setup the database use the below commands.
CREATE DATABASE commentdb;
CREATE TABLE comments {
id int NOT NULL,
name varchar(50) NOT NULL,
email varchar(100) NOT NULL,
comment varchar(255) NOT NULL,
PRIMARY KEY(id)
};

you will also need to have a user "root" with password "password" or will need to update the mysql setup in main.js to a valid user/password

After setup you will need to run the below three commands

augustine --port 8080 &
http-server "{dir_where_save}/download" --port 8000 &
node main.js 

After running, main web pages will be avaiable at 
vuln routes contain the vulnerable web application code
sec routes contain the hardended web applicatoin code

{host}/vuln_component
{host}/sec_component
{host}/vuln_xss
{host}/sec_xss
