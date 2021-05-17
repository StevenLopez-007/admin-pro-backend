const {Schema, model} = require('mongoose');

const hospitalSchema = Schema({
    nombre:{type:String,required:true},
    img:{type:String},
    usuario:{type:Schema.Types.ObjectId,required:true,ref:'Usuario'}
});

hospitalSchema.method('toJSON',function(){
    const {__v, ...object} = this.toObject();
    return object;
},{collection:'hospitales'});

module.exports = model('Hospital',hospitalSchema)