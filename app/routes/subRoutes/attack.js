const express = require('express');
const router = express.Router();

const attack = require("../../database/models/Attack");
const httpStatusCode = require('../../constants/httpStatusCode');

function sendResponse(res, attackData) {
	if (attackData) {
		return res.status(httpStatusCode.OK)
			.json(attackData);
	}

	return res.status(httpStatusCode.NOT_FOUND)
		.json({
			error: 'Attack not found'
		});
}

function sendError(res, error) {
	return res.status(httpStatusCode.INTERNAL_SERVER_ERROR)
		.json({
			error: error.message
		});
}

/**
 * Get attack data
 */
router.get('/', async (req, res) => {
	const attack_id = req.query.attack_id;

	if (attack_id) {
		await attack.getById(attack_id)
			.then((attackData) => {
				sendResponse(res, attackData);
			})
			.catch((error) => {
				sendError(res, error);
			})
	} else {
		await attack.getAll()
			.then((attackData) => {
				sendResponse(res, attackData);
			})
			.catch((error) => {
				sendError(res, error);
			})
	}

	res.end();
});

/**
 * Remove specific attack
 */
router.delete('/', async (req, res) => {
	const attack_id = req.query.attack_id;

	await attack.remove(attack_id)
		.then((attackData) => {
			sendResponse(res, attackData);
		})
		.catch((error) => {
			sendError(res, error);
		})

	res.end();
})

module.exports = router;
