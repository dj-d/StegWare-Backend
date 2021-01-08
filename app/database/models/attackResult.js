'use strict';

const attackResultModel = require('../mongo').models.attackResult;

/**
 *
 * @param data
 * @returns {*}
 */
function create(data) {
    let newAttackResult = new attackResultModel(data);
    return newAttackResult.save();
}

/**
 *
 * @param attack_id
 * @returns {*}
 */
function readOneById(attack_id) {
    return attackResultModel.findById(attack_id).lean().exec();
}

/**
 *
 * @param data
 * @returns {*}
 */
function readAll(data) {
    return attackResultModel.find(data).lean().exec();
}

/**
 *
 * @param attack_id
 * @returns {*}
 */
function deleteOne(attack_id) {
    return attackResultModel.deleteOne({_id: attack_id}).lean().exec();
}

module.exports = {
    create,
    readAll,
    readOneById,
    deleteOne,
};
