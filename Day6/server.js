
const  app = require('./src/app');
const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://prathmesh:prathmesh23@cluster0.swt52dy.mongodb.net/day-6")
    .then(()=> {
        console.log("Connect to Database ");
        
    })
}

connectToDb()



app.listen(3000, () => {
    console.log("server is running on port 3000");
    
})