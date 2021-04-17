'use strict';

// TODO: Change file name from AttackResult to Attack

const attackModel = require('../Connection').models.attackResult;
const attackError = require('../../constants/attackError');

/**
 * Check if attack exist into the DB
 *
 * @param attack_id
 * @returns {Promise<unknown>}
 */
async function isAttackOfDB(attack_id) {
    return new Promise((resolve, reject) => {
        attackModel.findOne({'_id': attack_id}, (error, attackData) => {
            if (attackData !== null) {
                console.log('Attack - isAttackOfDB - True');
                resolve(true);
            } else {
                if (!error) {
                    console.log('Attack - isAttackOfDB - True');
                    resolve(false);
                } else {
                    console.log('Attack - isAttackOfDB - Error: ' + error);
                    reject(error);
                }
            }
        });
    });
}

/**
 * Add attack into the DB
 *
 * @param data
 * @returns {*}
 */
async function create(data) {
    const alreadyExist = await isAttackOfDB(data);

    return new Promise((resolve, reject) => {
        if (!alreadyExist) {
            const attack = new attackModel(data);

            attack.save((error, data) => {
                if (data !== null) {
                    console.log('Attack - create - Saved');
                    resolve(true);
                } else {
                    if (!error) {
                        console.log('Attack - create - Not Saved');
                        resolve(false);
                    } else {
                        console.log('Attack - create - Error: ' + error);
                        reject(error);
                    }
                }
            });
        } else {
            console.log('Attack already exist');
            resolve();
        }
    });
}

/**
 * Get specific attack by ID
 *
 * @param attack_id
 * @returns {*}
 */
async function getById(attack_id) {
    const isValidAttackID = await isAttackOfDB(attack_id);

    return new Promise((resolve, reject) => {
        if (isValidAttackID) {
            attackModel.findById(attack_id, (error, attackData) => {
                if (attackData !== null) {
                    const attack = new attackModel(attackData);

                    resolve(attack);
                } else {
                    if (!error) {
                        console.log('Attack - getById - Not data');
                        resolve(false);
                    } else {
                        console.log('Attack - getById - Error: ' + error);
                        reject(error);
                    }
                }
            });
        } else {
            console.log('Attack not exist');
            reject(attackError.ERROR);
        }
    });
}

/**
 * Get all attacks
 *
 * @returns {*}
 */
async function getAll() {
    return new Promise((resolve, reject) => {
        attackModel.find({}, (error, res) => {
            if (res !== null) {
                resolve(res);
            } else {
                if (!error) {
                    console.log('Attack - getAll - Not data');
                    resolve(false);
                } else {
                    console.log('Attack - getAll - Error: ' + error);
                    reject(error);
                }
            }
        });
    })
}

/**
 * Remove specific attack from DB by ID
 *
 * @param attack_id
 * @returns {*}
 */
async function remove(attack_id) {
    const alreadyExist = await isAttackOfDB(attack_id); // TODO: Refactoring

    return new Promise((resolve, reject) => {
        if (alreadyExist) {
            resolve(attackModel.deleteOne(
                {
                    _id: attack_id
                }
            )
                .lean()
                .exec()
            );
        } else {
            console.log('Attack not exist');
            reject(attackError.ERROR);
        }
    });
}

// TODO: Change function name into routes
module.exports = {
    create,
    readAll: getAll,
    readOneById: getById,
    deleteOne: remove,
};
