const express = require('express');
const router = express.Router();

const payload = require('../../database/models/Payload');
const httpStatusCode = require('../../constants/httpStatusCode');

function sendResponse(res, payloadData) {
	if (payloadData) {
		return res.status(httpStatusCode.OK)
			.json(payloadData);
	} else {
		return res.status(httpStatusCode.NOT_FOUND)
			.json({
				error: 'Payload not found'
			});
	}
}

function sendError(res, error) {
	return res.status(httpStatusCode.INTERNAL_SERVER_ERROR)
		.json({
			error: error.message
		});
}

/**
 * Get payload data
 */
router.get('/', async (req, res) => {
	const payload_id = req.query.payload_id;

	if (payload_id) {
		await payload.getById(payload_id)
			.then((payloadData) => {
				sendResponse(res, payloadData);
			})
			.catch((error) => {
				sendError(res, error);
			})
	} else {
		await payload.getAll()
			.then((payloadData) => {
				sendResponse(res, payloadData);
			})
			.catch((error) => {
				sendError(res, error);
			})
	}

	res.end();
});

/**
 * Add payload into the DB
 */
router.post('/', async (req, res) => {
	await payload.create(req.body)
		.then((payloadData) => {
			sendResponse(res, payloadData);
		})
		.catch((error) => {
			sendError(res, error);
		})
})

/**
 * Remove payload from DB
 */
router.delete('/', async (req, res) => {
	const payload_id = req.query.payload_id;

	await payload.remove(payload_id)
		.then((payloadData) => {
			sendResponse(res, payloadData);
		})
		.catch((error) => {
			sendError(res, error);
		})
})

/**
 * Update specific payload
 */
router.put('/', async (req, res) => {
	const payload_id = req.query.payload_id;

	await payload.update(payload_id, req.body)
		.then((payloadData) => {
			sendResponse(res, payloadData);
		})
		.catch((error) => {
			sendError(res, error);
		})
})

module.exports = router;
