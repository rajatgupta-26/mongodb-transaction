# Transcations using MognoDb and NodeJs

MongoDb introduced transactions in v4.0. This project demonstrates transactions using an example of wallets


### Prerequisites

*  Fork this repository. Pull the code locally.
*  Make sure you've MongoDB(Replica Sets) setuped. Please read project Wiki to setup mongodb replica sets locally.
*  Install NodeJs v7.6 or above.

### Installing
```
npm install
```
Please chose any of below to run your code:
*  ```node index.js```
*  Nodemon
```npm install nodemon -g``` ```nodemon```
* PM2 
```npm install pm2 -g``` ```pm2 start ecosystem.config.js```

### Testing
For testing this code I've used Apache Bench (ab). Example ```ab -p test/addMoney.json -T application/json  -c 10 -n 2000 http://127.0.0.1:8000/addMoney```


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


