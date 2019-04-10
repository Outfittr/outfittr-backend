const express = require('express');
const check = require('express-validator/check');
const Authorization = require('../../middlewares/authorization');
const ControllerHandler = require('../../middlewares/controller.handler');
const GarmentController = require('../../controllers/garments.controller');

var router = express.Router();

// api/garment --------------------------------------------------------------------

router.get('/', 
    Authorization, [
        check.query('limit').isInt({$gt: 0}).optional(),
        check.query('offset').isInt({$gt: -1}).optional()
    ],
    ControllerHandler(
        GarmentController.getGarments, 
        (req, res, next) => [
            req.query.limit,
            req.query.offset,
        ]
    )
);
router.post('/', 
    Authorization,
    ControllerHandler(
        GarmentController.addGarment, 
        (req, res, next) => [
            req.body
        ]
    )
);
router.delete('/:id', 
    Authorization,
    ControllerHandler(
        GarmentController.deleteGarment, 
        (req, res, next) => [
            req.params.id
        ]
    )
);

// --------------------------------------------------------------------------------

module.exports = router;