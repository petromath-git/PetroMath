const db = require("../db/db-connection");
const Density = db.density;
const DipChart = db.tank_dip_chart;
const Lookup = db.lookup;
const { Sequelize, Op } = require("sequelize");

module.exports = {
    getDensity: (temperature, density) => {
        return Density.findOne({
            attributes: ['density_at_15'],
            where: {'temparture': temperature, 'density': density}
        });
    },
    getDipChart: (chart_name, reading) => {
        return DipChart.findOne({
            attributes: ['volume'],
            where: {'dip_chart_name': chart_name, 'dip_reading': reading}
        });
    },
    getChartNames: (location_code, lookup_type) => {
        return Lookup.findAll({
            attributes:['lookup_id','description'],
            where: {'location_code': location_code, 'lookup_type': lookup_type}
        });
    },
    getTallyXmlData: (exportDate, locationCode) => {
        return db.sequelize.query(
            "select tally_export('"+ exportDate + "','"+ locationCode+ "') as xmlData;"
        );
    }
}