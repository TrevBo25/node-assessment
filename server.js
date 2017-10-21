const express = require('express'),
      bodyParser = require('body-parser')
      controller = require('./usersCtrl');

const app = express();
app.use(bodyParser.json());

app.get('/api/users', controller.getUsers);
app.get('/api/users/:id', controller.getUser);
app.get('/api/admins', controller.getAdmins);
app.get('/api/nonadmins', controller.getNonAdmins);
app.get('/api/user_type/:type', controller.getUserType);
app.put('/api/users/:id', controller.updateUser);
app.post('/api/users', controller.addUser);
app.delete('/api/users/:id', controller.deleteUser);


const PORT = 3000;
app.listen(PORT, () => console.log('listening on port: ', PORT));