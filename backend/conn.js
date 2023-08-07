const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://abhi-to-do-list:devil@cluster0.zrljbvb.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("sucess")
}).catch((error) => {
    console.log(error);
})