npm i

To run the MongoDb database
Open a new console in the project directory and run 'mongod --dbpath=/data'
If you get an error "Unable to create/open lock file: /data/mongod.lock errno:13 Permission denied
", run: sudo chown -R `id -u` /data/db

npm start


