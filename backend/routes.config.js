const UsersController = require('./controllers/users.controller'); // pendding 1
const { emailValidation, passwordValidation } = require('./middleware/auth.validation');

exports.routesConfig = function (app) {
    app.post('/auth/register', [
        emailValidation,
        passwordValidation,
        UsersController.register
    ]) 
    app.post('/auth/login', [
        UsersController.login
    ]);  
    app.get('/users/current',[
        UsersController.current
    ]);
} 


