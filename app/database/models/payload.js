'use strict';

const payloadModel = require('../mongo').models.payload;

/**
 *
 * @param data
 * @returns {*}
 */
function create(data) {
    let newPayload = new payloadModel(data);

    return newPayload.save();
}

/**
 *
 * @param payload_id
 * @returns {*}
 */
function readOneById(payload_id) {
    return payloadModel.findById(payload_id).lean().exec();
}

/**
 *
 * @param data
 * @returns {*}
 */
function readAll(data) {
    return payloadModel.find(data).lean().exec();
}

/**
 *
 * @param payload_id
 * @returns {*}
 */
function deleteOne(payload_id) {
    return payloadModel.deleteOne({_id: payload_id}).lean().exec();
}

/**
 *
 * @param payload_id
 * @param update_payload
 * @returns {*}
 */
function updateOne(payload_id, update_payload) {
    return payloadModel.updateOne({ _id: payload_id }, { $set: update_payload}).lean().exec();
}

module.exports = {
    create,
    readAll,
    readOneById,
    deleteOne,
    updateOne
};
