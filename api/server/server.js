const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.rolePath = '/api/role';
        this.userPath = '/api/user';

        this.conectBD();

        this.middlewares();

        this.routes();
    }

    async conectBD(){
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );
    }

    routes(){
        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.rolePath, require('../routes/role'));
        this.app.use( this.userPath, require('../routes/user'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;