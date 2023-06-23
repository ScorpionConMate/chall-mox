const { default: mongoose } = require('mongoose');

const DBConfig = {
    mongoUrl: 'mongodb://root:root@localhost:27018/scrapper_mox?authSource=admin',
}

async function connect() {
    try {
        await mongoose.connect(DBConfig.mongoUrl, {
            dbName: 'scrapper_mox',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user: 'root',
            pass: 'root',
        });

        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to database: ", error);
    }
}

module.exports = { connect }
