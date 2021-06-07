const express = require('express');
const cors = require('cors')

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

require('./src/config/connection');

app.use(require('./src/routes/categoriasRoutes'));
app.use(require('./src/routes/personasRoutes'));
app.use(require('./src/routes/ticketsRoutes'));

app.listen(app.get('port'), (error) => {
    if (error) 
        console.log(error);
    else
        console.log(`Servidor en puerto: ${app.get('port')}`);
});