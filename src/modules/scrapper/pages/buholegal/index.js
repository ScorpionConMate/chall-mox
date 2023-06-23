const { UserBuhoLegalDto } = require('../../../users/user-buholegal.dto');
const { UserModel } = require('../../../users/user.schema');
const { ScrapperCore } = require('../../core/scrapper.core');

class BuhoLegalPage {
    _url = "https://www.buholegal.com/consultasep/";

    async getResults() {
        const page = await this.fillForm();

        const tableData = await page.waitForSelector('.table');

        const headers = (await tableData.$$eval('thead tr th', ths => ths.map(th => th.textContent))).map(header => header.trim());

        const rows = await tableData.$$eval('tbody tr', trs => trs.map(tr => {
            const tds = [...tr.querySelectorAll('td')];
            const ths = [...tr.querySelectorAll('th')];
            const data = [...ths, ...tds].map(td => td.textContent.trim());
            return data;
        }));

        rows.forEach((row) => {
            const obj = {};
            row.forEach((value, index) => {
                obj[headers[index]] = value;
            });
            UserModel.findOneAndUpdate({ cedula: result.cedula }, UserBuhoLegalDto(result), { upsert: true }).exec()
        })

        await page.browser().close();
    }

    async fillForm() {
        // TODO: Get data from DB
        const dataTest = {
            nombre: "Daniel",
            apellidoPaterno: "Gonzalez",
            apellidoMaterno: "Zambrano"
        };

        const page = await new ScrapperCore(this._url).getPage();

        // TODO: Get selectors from DB
        const formSelector = {
            nombre: "nombre",
            paterno: "paterno",
            materno: "materno",
            submit: "submit"
        };

        await page.type(`input[name="${formSelector.nombre}"]`, dataTest.nombre);
        await page.type(`input[name="${formSelector.paterno}"]`, dataTest.apellidoPaterno);
        await page.type(`input[name="${formSelector.materno}"]`, dataTest.apellidoMaterno);

        const subButton = await page.$x(`//input[@type="submit" and @value="Buscar"]`);
        await subButton.at(0).click();
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        return page;
    }
}

module.exports = { BuhoLegalPage }
