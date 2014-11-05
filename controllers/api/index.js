var router = require('../../lib/expressio').router;

router.get('/',function (req,res) {
	res.send('api hello');
})

module.exports = router;