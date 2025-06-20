const { Employee } = require("../models/Employee");

const bcryptjs = require("bcryptjs");

//const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    const { name, password } = req.body;
    const user = await Employee.findOne({ where: { name: name } });

    //const hashedPassword = bcryptjs.hashSync(password);
    //res.send(hashedPassword);
    //return;
    console.log(user);
    if (!user) {
        res.status(404).send({ msg: "INCORRECT_USERNAME" });
        return;
    }
    const isPasswordMatch = bcryptjs.compareSync(password, user.password);
    if (!isPasswordMatch) {
        res.status(400).send({ msg: "INCORRECT_USER_OR_PASSWORD" });
        return;
    }
    //USUARIO Y PASSWORD VALIDO
    // Generar un token con el userId en el payload .sign()
    // y un jwt secret
    //let token = jwt.sign({ id: createdMember.id }, jwt_secret);
    //const accessToken = jsonwebtoken.sign({ userId: user._id }, JWT_SECRET);
    //res.send({ accessToken });
    //res.status(201).send({ llave: createdMember.id });
    //res.status(201).send({ token: token });
};

module.exports = { loginUser };
