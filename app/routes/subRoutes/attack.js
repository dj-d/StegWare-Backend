const express = require('express');
const router = express.Router();

const attack = require("../../database/models/Attack");
const httpStatusCode = require('../../constants/httpStatusCode');

// TODO: Ask to ZappaBoy
function errorResponse(res, error) {
	return res.status(error.status)
		.json({
			error: error.message
		});
}

function dataNotFound(res) {
	return res.status(httpStatusCode.NOT_FOUND)
		.json({
			error: 'Attack not found'
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
				if (attackData) {
					res.status(httpStatusCode.OK)
						.json(attackData);
				} else {
					dataNotFound(res);
				}
			})
			.catch((error) => {
				errorResponse(res, error);
			})
	} else {
		await attack.getAll()
			.then((attackData) => {
				if (attackData) {
					res.status(httpStatusCode.OK)
						.json(attackData);
				} else {
					dataNotFound(res);
				}
			})
			.catch((error) => {
				errorResponse(res, error);
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
			if (attackData) {
				res.status(httpStatusCode.OK)
					.json(attackData);
			} else {
				dataNotFound(res);
			}
		})
		.catch((error) => {
			errorResponse(res, error);
		})

	res.end();
})

module.exports = router;
