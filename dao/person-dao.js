const db = require("../db/db-connection");
const Person = db.person;
const { Op } = require("sequelize");
const utils = require("../utils/app-utils");
const Sequelize = require("sequelize");

module.exports = {
    findUsers: (locationCode) => {
        if (locationCode) {
            return Person.findAll({
                where: { [Op.and]: [
                { 'location_code': locationCode }, {'effective_end_date': {[Op.gte] : utils.getPreviousDay()}}
            ] }
            });
        } else {
            return Person.findAll();
        }
    },
    findUserByName: (personName, userName, locationCode) => {
        if (locationCode) {
            return Person.findAll({
                where: {
                    [Op.and]: {
                        [Op.or]: {
                            'Person_Name': personName,
                            'User_Name': userName,
                        },
                        'location_code': locationCode
                    },
                }
            });
        } else {
            return Person.findAll({
                where: {
                    'Person_Name': personName,
                    'User_Name': userName
                }
            });
        }
    },
    create: (user) => {
        return Person.create(user);
    },
    changePwd: (user, currentPassword) => {
        return new Promise((resolve, reject) => {
            Person.update({
                Password: user.Password
            }, {
                where: {'Password': currentPassword, 'Person_id': user.Person_id},
            }).then(function (result) {
                const firstElement = result.shift();
                if (firstElement === 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });

    },
    findDrivers: (locationCode) => {
        return Person.findAll({
            where: {
                'location_code': locationCode,
                [Op.or]: [{'Role': 'Driver'}, {'Role': 'Helper'}]
            }
        });    
    },
    // findAllUsers: (locationCode) => {
    //     if (locationCode) {
    //         return Person.findAll({
    //             where: {'location_code': locationCode}
    //         });
    //     } else {
    //         return Person.findAll();
    //     }
    // },
};