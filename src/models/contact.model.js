
var dbConn = require('../../config/db.config');


var Contact = function(contact){
    this.first_name     = contact.first_name;
    this.last_name      = contact.last_name;
    this.email          = contact.email;
    this.phone          = contact.phone;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};
Contact.create = function (newEmp, result) {   
    console.log('create'); 
    dbConn.query("INSERT INTO contacts set ?", newEmp, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};
Contact.findById = function (id, result) {
    let intId=parseInt(id);
    dbConn.query("Select first_name,last_name,email,phone from contacts where id = ? ", intId, function (err, res) {      
        console.log("findbyid models");
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Contact.findByWord=function(word,result){
    let temp='*';
    let searchpattern=word;

    let regex = temp. concat(searchpattern);
    temp='*';
    
    regex=regex.concat(temp);
    console.log(regex);
    
    dbConn.query("Select first_name,last_name,email,phone from contacts where first_name REGEXP  ? ",regex,function(err,res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    })
}
Contact.findAll = function (result) {
    dbConn.query("Select id, first_name,last_name,email,phone from contacts", function (err, res) {
        console.log("findall models");
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('contacts : ', res);  
            result(null, res);
        }
    });   
};
Contact.update = function(id, contact, result){
  dbConn.query("UPDATE contacts SET first_name=?,last_name=?,email=?,phone=?  where id = ? ", [contact.first_name,contact.last_name,contact.email,contact.phone, id], function (err, res) {
    console.log("update models");   
    if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Contact.delete = function(id, result){
     dbConn.query("DELETE FROM contacts WHERE id = ?", [id], function (err, res) {
        console.log("delete modles");
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Contact;