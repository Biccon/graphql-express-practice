import express from 'express';
import controller from './auth.controller';

const router = express.Router()
router.post('/register', controller.register)

router.get('/register', (req, res) => {
	res.send('hellow~');
})

module.exports = router
