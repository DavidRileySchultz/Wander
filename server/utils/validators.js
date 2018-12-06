var Joi = require('joi')
class Validator {
    validateCreateGroupRequest(req, res, next ) {
        const requestBody = req.body
        const schema = {
            title: Joi.string().required(),
            emails: Joi.array()
        }
        const {error} = Joi.validate(requestBody, schema)
        if(error) {
            return res.status(422).send({
                error: "Invalid Input", 
                message: error.message || "Missing fields"
            })
        }
        return next()
    }

    validateAcceptInvite(req, res, next ) {
        const requestBody = req.body
        const schema = {
            groupId: Joi.string().required(),
            email: Joi.email().required()
        }
        const {error} = Joi.validate(requestBody, schema)
        if(error) {
            return res.status(422).send({
                error: "Invalid Input", 
                message: error.message
            })
        }
        return next()
    }
    
    validateSendInvite(req, res, next) {
        const requestBody = req.body
        const schema = {
            groupId: Joi.string().required(),
            emails: Joi.array()
        }
        const {error} = Joi.validate(requestBody, schema)
        if(error) {
            return res.status(422).send({
                error: "Invalid Input", 
                message: error.message
            })
        }
        return next()
    }

    validateLeaveGroup(req, res, next) {
        const requestBody = req.body
        const schema = {
            id: Joi.string().required(),
            email: Joi.email().required()
        }
        const {error} = Joi.validate(requestBody, schema)
        if(error) {
            return res.status(422).send({
                error: "Invalid Input", 
                message: error.message
            })
        }
        return next()
    }

    validateRemoveFrom(req, res, next) {
        const requestBody = req.body
        const schema = {
            id: Joi.string().required(),
            groupId: Joi.string().required(),
            email: Joi.string().required()
        }
        const {error} = Joi.validate(requestBody, schema)
        if(error) {
            return res.status(422).send({
                error: "Invalid Input", 
                message: error.message
            })
        }
        return next()
    }
    
    validateContribute(req, res, next) {
        const requestBody = req.body
        const schema = {
            title: Joi.string().required(),
            content: Joi.string().required(),
            image: Joi.string()           
        }
        const {error} = Joi.validate(requestBody, schema)
        if(error) {
            return res.status(422).send({
                error: "Invalid Input", 
                message: error.message
            })
        }
        return next()
    }

}

module.exports = new Validator()