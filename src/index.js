const { connect} = require('./config/db.config');
const { BuhoLegalPage } = require('./modules/scrapper/pages/buholegal');


(async () => {
    await connect();
    await new BuhoLegalPage().getResults()
})();
