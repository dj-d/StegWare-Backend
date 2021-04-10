'use strict';

const payloadModel = require('../Connection').models.payload;
const payloadError = require('../../constants/payloadError')

/**
 * Check if payload exist into the DB
 *
 * @param payload_id
 * @returns {Promise<unknown>}
 */
async function isPayloadOfDB(payload_id) {
    return new Promise((resolve, reject) => {
        payloadModel.findOne({'_id': payload_id}, (error, payloadData) => {
            if (payloadData !== null) {
                console.log('Payload - isPayloadOfDB - True');
                resolve(true);
            } else {
                if (!error) {
                    console.log('Payload - isPayloadOfDB - False');
                    resolve(false);
                } else {
                    console.log('Payload - isPayloadOfDB - Error: ' + error);
                    reject(error);
                }
            }
        })
    })
}

/**
 * Add payload into the DB
 *
 * @param payloadData
 * @returns {*}
 */
async function create(payloadData) {
    const alreadyExist = await isPayloadOfDB(payloadData);

    return new Promise((resolve, reject) => {
        if (!alreadyExist) {
            const payload = new payloadModel(payloadData);

            payload.save((error, data) => {
                if (data !== null) {
                    console.log('Payload - create - Saved');
                    resolve(true);
                } else {
                    if (!error) {
                        console.log('Payload - create - Not Saved');
                        resolve(false);
                    } else {
                        console.log('Payload - create - Error: ' + error);
                        reject(error);
                    }
                }
            })
        } else {
            console.log('Payload already exist');
            reject(payloadError.ERROR);
        }
    });

}

/**
 *
 * @param payload_id
 * @returns {*}
 */
function getById(payload_id) {
    const isValidPayloadID = isPayloadOfDB(payload_id);

    return new Promise((resolve, reject) => {
        if (isValidPayloadID) {
            payloadModel.findById(payload_id, (error, payloadData) => {
                if (payloadData !== null) {
                    const payload = new payloadModel(payloadData);
                    resolve(payload);
                } else {
                    if (!error) {
                        console.log('Payload - readOneById - Not data');
                        resolve(payloadError.ERROR);
                    } else {
                        console.log('Payload - readOneById - Error: ' + error);
                        reject(error);
                    }
                }
            })
        } else {
            console.log('Payload not exist');
            resolve(payloadError.ERROR);
        }
    });
}

/**
 *
 * @returns {*}
 */
async function getAll() {
    return new Promise((resolve, reject) => {
        payloadModel.find({}, (error, res) => {
            if (res !== null) {
                resolve(res);
            } else {
                if (!error) {
                    resolve(false);
                } else {
                    reject(error)
                }
            }
        })
    })
}

// TODO: To complete
/**
 *
 * @param payload_id
 * @returns {*}
 */
function remove(payload_id) {
    return payloadModel.deleteOne(
        {
            _id: payload_id
        }).lean().exec();
}

// TODO: To complete
/**
 *
 * @param payload_id
 * @param update_payload
 * @returns {*}
 */
function update(payload_id, update_payload) {
    return payloadModel.updateOne(
        {
            _id: payload_id
        },
        {
            $set: update_payload
        }).lean().exec();
}

module.exports = {
    create,
    getAll,
    getById,
    remove,
    update
};
