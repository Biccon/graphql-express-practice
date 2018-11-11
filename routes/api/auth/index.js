import express from 'express';
import controller from './auth.controller';

const router = express.Router()
router.post('/register', controller.register)

module.exports = router