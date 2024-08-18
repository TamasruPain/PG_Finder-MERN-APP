const joi = require('joi');


//-------------------------------------------------------------------------
const signupValidation = (req, res, next) => {
    const schema = joi.object({
        userName: joi.string().min(3).max(100).required(),
        userEmail: joi.string().email().required(),
        userPassword: joi.string().min(4).max(100).required(),
        userAddress: joi.string().min(5).max(200).required(),
        userPhone: joi.string().min(10).max(10).required(),
        userDOB: joi.string().min(2).max(50).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Bad request', error });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = joi.object({
        userEmail: joi.string().email().required(),
        userPassword: joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};

//------------------------------------------------------------------------

const adminSignupValidation = (req, res, next) => {
    const schema = joi.object({
        adminName: joi.string().min(3).max(100).required(),
        adminEmail: joi.string().email().required(),
        adminPassword: joi.string().min(4).max(100).required(),
        adminDOB: joi.string().min(2).max(50).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Bad request', error });
    }
    next();
};

const adminLoginValidation = (req, res, next) => {
    const schema = joi.object({
        adminEmail: joi.string().email().required(),
        adminPassword: joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};

//------------------------------------------------------------------------

module.exports = {
    signupValidation, loginValidation, adminLoginValidation, adminSignupValidation
};
