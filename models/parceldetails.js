const {Schema}=require('mongoose');
const {model}=require('mongoose');

const demo=new Schema({
    parcelid:{type:Number,required:true,unique:true},
    sendername:{type:String,required:true},
    recivername:{type:String,required:true},
    dispatchdate:{type:String,required:true},
    deliverydate:{type:String,required:true}


})

const parcel=model('details',demo);
module.exports=parcel;