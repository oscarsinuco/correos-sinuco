const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;


app.use(express.json())



const allowedOrigins = [
    'https://oscarsinuco.github.io',
    'http://localhost:8100'
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    }
}

app.options('*', cors(corsOptions));


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'servicesinuco@gmail.com',
        pass: 'oscar160499'
    }
});



app.post('/correoPortafolio', cors(corsOptions), (req, res) => {
    let mailDetails = {
        from: 'servicesinuco@gmail.com',
        to: `oscarsinuco@gmail.com`,
        subject: `Cliente interesado - ${req.body.nombre}`,
        html: `<h2>Cliente: ${req.body.nombre} - ${req.body.correo}</h2><br>
            Ha escrito lo siguiente: <br><br>
            <p>${req.body.mensaje}</p>
        `
    }
    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            res.json({
                error: true,
                mensaje: "No se ha podido contactar en estos momentos, intenta mas tarde."
            }) 
        } else { 
            res.json({
                error: false,
                mensaje: "Mensaje enviado exitosamente, en un momento me contactaré contigo."
            })
        } 
    }); 


});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
