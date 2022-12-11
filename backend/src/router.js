const router = require("express").Router();
const foodController = require('./controllers/foodController')
const authController = require('./controllers/authController')

router.use("/api/foods", foodController);
router.use('/api/users', authController)

module.exports = router;
