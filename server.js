const express = require('express');
const nodemailer = require('nodemailer'); 
const app = express();
const port = process.env.PORT || 3000;




let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'servicesinuco@gmail.com', 
        pass: 'oscar160499'
    } 
});



app.get('/correoPortafolio', (req, res) => {
    let mailDetails = { 
        from: 'servicesinuco@gmail.com', 
        to: 'oscarsinuco@gmail.com', 
        subject: 'Test mail', 
        text: 'Node.js testing mail for GeeksforGeeks'
    }

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            res.json({
                mensaje: "todo mal"
            }) 
        } else { 
            res.json({
                mensaje: "todo bien"
            })
        } 
    }); 

    
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
