const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) =>{
    //#swagger.tags=['users]
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async(req, res) =>{
    //#swagger.tags=['users]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({_id: userId });
    result.toArray().then((users)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createUser=async(req, res) =>{
    //#swagger.tags=['users]
    const user={
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        shippingAdress: req.body.shippingAdress,
    };
    const response=await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged){
        res.status(204).send()
    }else{
        res.status(500).json(response.error || 'some error occurred while updating server.');
    }
};

const updateUser=async(req, res) =>{
    //#swagger.tags=['users]
    const userId = new ObjectId(req.params.id);
    const user={
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        shippingAdress: req.body.shippingAdress,
    };
    const response=await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId }, user);
    if (response.modifiedCount > 0){
        res.status(204).send()
    }else{
        res.status(500).json(response.error || 'some error occurred while updating server.');
    }
};

const deleteUser=async(req, res) =>{
    //#swagger.tags=['users]
    const userId = new ObjectId(req.params.id);
    const response=await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId });
    if (response.deletedCount > 0){
        res.status(204).send()
    }else{
        res.status(500).json(response.error || 'some error occurred while updating server.');
    }
};

module.exports={
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};