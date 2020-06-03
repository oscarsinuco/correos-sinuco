const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.get('/correoPortafolio', (req, res) => {
    res.json({
        mensaje: "todo bien"
    })
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
