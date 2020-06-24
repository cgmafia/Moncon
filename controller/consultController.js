const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Consult = mongoose.model('Consult');

router.get('/', (req, res) => {
    res.render("consult/addOrEdit", {
        viewTitle: "Insert Consult"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var consult = new Consult();
    consult.fullName = req.body.fullName;
    consult.email = req.body.email;
    consult.mobile = req.body.mobile;
    consult.city = req.body.city;
    consult.rate = req.body.rate;
    consult.save((err, doc) => {
        if (!err)
            res.redirect('consult/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("consult/addOrEdit", {
                    viewTitle: "Insert Consult",
                    consult: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Consult.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('consult/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("consult/addOrEdit", {
                    viewTitle: 'Update Consult',
                    consult: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Consult.find((err, docs) => {
        if (!err) {
            res.render("consult/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving consult list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Consult.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("consult/addOrEdit", {
                viewTitle: "Update Consult",
                consult: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Consult.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/consult/list');
        }
        else { console.log('Error in consult delete :' + err); }
    });
});

module.exports = router;