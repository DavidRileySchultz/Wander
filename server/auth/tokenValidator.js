import jwt from 'jsonwebtoken'
import dotEnv from 'dotenv';

dotEnv.config()

const jwtSecret = process.env.JWT_SECRET

module.exports.validateToken = (req, res, next) => {
    
}