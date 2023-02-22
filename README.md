For starting this project you need:

#Command for rebuilding docker images by docker-compose.yml file: docker docker-compose build --no-cache
#Command for creating docker containers by docker-compose.yml file: docker-compose up

You need to add these string into hosts file. It`s located at C:\Windows\System32\Drivers\etc\hosts.
It should be added for working with domain name "diploma-work.com" which used in this project.

127.0.0.1 diploma-work.com
0.0.0.0 diploma-work.com
192.168.0.1 diploma-work.com

#Command for migration applying: Update-Database 
