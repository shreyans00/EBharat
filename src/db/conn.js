const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/stud_regis").then(() => {
//     console.log(`connection success`);
// }).catch((e) => {
//     console.log(`no connection`);
// })

const DB = `mongodb+srv://Shreyans:shreyans@cluster0.d5cqq.mongodb.net/StudInfo?retryWrites=true&w=majority`;
mongoose.connect(DB).then(() => {
    console.log(`connection success`);
}).catch((e) => console.log(`no connection`));