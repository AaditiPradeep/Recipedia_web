const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });


  const newSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    
    password: {
        type:String, 
        required: true
    }
})

const collection = mongoose.model("collection", newSchema)
module.exports=collection