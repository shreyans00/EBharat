const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");

const Register = require("./models/register");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
// console.log(path.join(__dirname, "../public"));
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
    // res.send("server is down temporarily");
});

app.get("/contact", (req, res) => {
    res.render("contact");
})

app.get("/sign_in", (req, res) => {
    res.render("sign_in");
})

app.get("/teacher", (req, res) => {
    res.render("teacher");
})

app.post("/sign_in", async (req, res) => {
    try {
        // console.log(req.body.firstname);
        const pass = req.body.password;
        const cpass = req.body.cpassword;

        if (pass === cpass) {
            const regStud = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                age: req.body.age,
                country: req.body.country,
                gender: req.body.gender,
                password: pass,
                cpassword: cpass,
                desc: req.body.desc
            })
            const registered = await regStud.save();
            res.status(201).render("sign_in");
        }
        else {
            res.send("passwords are not matching")
        }

    } catch (error) {
        res.status(404).send(error);
    }
})

app.listen(port, () => {
    console.log(`server is running at port : ${port}`);
})