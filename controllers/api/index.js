var router = require('express').Router();

router.get('/',function (req,res) {
	res.send('api hello');
})

module.exports = router;