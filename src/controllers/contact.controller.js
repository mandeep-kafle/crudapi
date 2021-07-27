
const Contact = require('../models/contact.model');

exports.findAll = function(req, res) {
  
  Contact.findAll(function(err, contact) {
    console.log('findall controller');
    if (err)
    res.send(err);
    console.log('res', contact);
    res.send(contact);
  });
};


exports.create = function(req, res) {
    const new_contact = new Contact(req.body);
    console.log('create controller',req);

   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Contact.create(new_contact, function(err, contact) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Contact added successfully!",data:contact});
        });
    }
};


exports.findById = function(req, res) {
    console.log('findbyid controller');
    Contact.findById(req.params.id, function(err, contact) {
        if (err)
        res.send(err);
        res.json(contact);
    });
};


exports.update = function(req, res) {
    console.log('update controller');
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Contact.update(req.params.id, new Contact(req.body), function(err, contact) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Contact successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
  Contact.delete( req.params.id, function(err, contact) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'contact successfully deleted' });
  });
};

exports.findByWord=function(req,res){
    console.log(req.params.word);
    Contact.findByWord(req.params.word, function(err, contact) {
        if (err)
        res.send(err);
        res.json(contact);
    });
}