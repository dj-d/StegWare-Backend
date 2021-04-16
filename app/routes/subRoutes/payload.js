const express = require('express');
const router = express.Router();

const payload = require('../../database/models/Payload');
const httpStatusCode = require('../../constants/httpStatusCode');

/**
 * Get payload data
 */
router.get('/', async (req, res) => {
	const payload_id = req.query.payload_id;

	if (payload_id) {
		await payload.getById(payload_id)
			.then((payload) => {
				if (payload) {
					res
						.status(httpStatusCode.OK)
						.json(payload);
				} else {
					res
						.status(httpStatusCode.NOT_FOUND)
						.json({
							error: 'Payload not found'
						});
				}
			})
			.catch((error) => {
				res.status(error.status)
					.json({
						error: error.message
					});
			})
	} else {
		await payload.getAll()
			.then((payload) => {
				res.status(httpStatusCode.OK).json(payload);
			})
			.catch((error) => {
				res.status(error.status)
					.json({
						error: error.message
					});
			})
	}

	res.end();
});

/**
 * Add payload into the DB
 */
router.post('/', async (req, res) => {
	await payload.create(req.body)
		.then((payload) => {
			res.json(payload);
		})
		.catch((error) => {
			res.status(httpStatusCode.INTERNAL_SERVER_ERROR)
				.json({
					error: error
				});
		})
})

/**
 * Remove payload from DB
 */
router.delete('/', async (req, res) => {
	const payload_id = req.query.payload_id;

	await payload.remove(payload_id)
		.then((payload) => {
			res.json(payload);
		})
		.catch((error) => {
			res.status(error.status)
				.json({
					error: error.message
				});
		})
})

/**
 * Update specific payload
 */
router.put('/', async (req, res) => {
	const payload_id = req.query.payload_id;

	await payload.update(payload_id, req.body)
		.then((payload) => {
			res.json(payload);
		})
		.catch((error) => {
			res.status(httpStatusCode.INTERNAL_SERVER_ERROR)
				.json({
					error: error
				});
		})
})

module.exports = router;
