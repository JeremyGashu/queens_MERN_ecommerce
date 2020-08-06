const Admin = require('../models/admins')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// @Purpose = List all admins
// @Previlage = Minimal Admin
// @Required fields =  No
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
exports.admins_all = (req, res) => {
    Admin.find()
        .exec()
        .then(result => {
            res.status(200).json({
                count : result.length,
                admins : result
            })
        }).
        catch(err => {
            res.status(404).json({error : err})
        })
}

// @Purpose = Get single admin using id
// @Previlage = Minimal Admin
// @Required fields =  admin_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
exports.admin_by_id = (req, res) => {
    let id = req.params.admin_id
    Admin.findById(id).
        exec().
        then(admin => {
            if (admin) {
                res.status(200).json(admin)
            } else {
                res.status(404).json({error : 'No Admin Found with this ID.'})
            }
        }).
        catch(err => {
            res.status(404).json({error : 'No Admin Found with this ID.'})
        })
}

// @Purpose = Creating Admin
// @Previlage = Superadmin
// @Required fields =  phoneNo, password
// @Optional params = superAdmin
// @ Success status code = 201
// @ Faillure Status code = 400
// @Request = POST
exports.create_admin = (req, res) => {

    //TODO use bcrypt to hash password
    const {phoneNo, password, superAdmin} = req.body
    if(phoneNo && password) {
        //check if the phone number is taken
        Admin.find({phoneNo : phoneNo}).exec()
        .then(admin => {
            if(admin.length >= 1) {
                // console.log(admin)
                res.status(400).json({error : 'Phone number already registered'})
            }
            else{
                if(password.length < 8) {
                    res.status(400).json({error : 'Password should be at least 8 characters'})
                }
                else {
                    bcrypt.hash(password,10,(err, hashed) => {
                        if(err) {
                            res.status(400).json({error : err})
                        }
                        else {
                            let newAdmin = new Admin({
                                _id : new mongoose.Types.ObjectId(),
                                phoneNo,
                                password : hashed,
                            })
                            if(superAdmin) {
                                newAdmin.superAdmin = superAdmin
                            }
                            newAdmin.save().then(() => {
                                res.status(201).json({msg:'Created!',success : true})
                            })
                        }
                    })
                }
            }
        }).catch(err => {
            console.log(err)
            res.status(400).json({error : 'Some intername error happened.'})
        })        
    }
    else {
        res.status(400).json({error : 'Phone number and password should be provided'})
    }
}

// @Purpose = Delete single Admin
// @Previlage = Superadmin 
// @Required fields =  admin_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400
// @Request = DELETE
exports.delete_admin = (req, res) => {
    //check is there is at least one admin
    let id = req.params.admin_id
    Admin.find({}).exec().then(admins => {
        if(admins.length <= 1) {
            res.status(400).json({error : 'There must be at least one Admin'})
        }
        else {
            try {
                Admin.deleteOne({_id : mongoose.Types.ObjectId(id)}).exec().
                then((val => {
                    res.status(200).json({msg : 'Deleted!', val})
                }))
             } catch (error) {
                 console.log(error)
                 res.status(404).json({error : 'No Admin found with this ID'})
             }
        }
    }).catch(err => {
        console.log(err)
        res.status(400).json({error : 'No Admin found'})
    })
}

// @Purpose = Update Admin Pasword and super admin status
// @Previlage = Superadmin
// @Required fields =  phoneNo, password
// @Optional params = superAdmin
// @ Success status code = 200
// @ Faillure Status code = 400
// @Request = PATCH
exports.update_admin_by_id = (req, res) => {
    const {password, confirmPassword, superAdmin} = req.body
    let id = req.params.admin_id

    if(password && confirmPassword) {
        Admin.findById(id).exec()
        .then(admin => {
            if(admin){
                if(password.length < 8 || password != confirmPassword) {
                    res.status(401).json({error : 'Password should be at least 8 characters and should match the confirmation password'})
                }
                else {
                    bcrypt.hash(password,10,(err, hashed) => {
                        if(err) {
                            res.status(400).json({error : err})
                        }
                        else {
                            admin.password = hashed
                            if(superAdmin != null) {admin.superAdmin = superAdmin}
                            admin.save().then(() => {
                                res.status(200).json({msg:'Updated!',success : true})
                            })
                        }
                    })
                }
            }
            else {
                res.status(400).json({error : 'No Admin found with this ID'})
            }
        }).catch(err => {
            console.log(err)
            res.status(400).json({error : 'Some internal error happened.'})
        })        
    }
    else {
        res.status(400).json({error : 'password and cofirmationPassword should be provided'})
    }
}

// @Purpose = Handling error
// @Previlage = No
// @Required fields =  No
// @Optional params = No
// @ status code = 404
// @Request = No
exports.error_handler = (req, res) => {
    res.status(404).json({
        error : 'Page Not Found!'
    })
}