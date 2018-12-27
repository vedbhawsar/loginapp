const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var LoginSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true  
  }
  
});

LoginSchema.methods.comparePassword = function (passw, cb) {    
        if(passw != this.password){
            return cb(null,false);
        }
        else
            cb(null, true);
    
};
module.exports = mongoose.model('Login', LoginSchema,"login");
