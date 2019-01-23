module.exports = {
    apps: [{
        name: "Elanic-Transactions",
        script: "./index.js",
        watch: false,
        env: {
	       "NODE_ENV": "development",
	       "DB":"mongodb://127.0.0.1:27017,127.0.0.1:27018/elanic?replicaSet=rs",
        }
    }]
}