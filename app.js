
const express = require('express');

const app = express();



app.get('/forum/post')

// app.get('/users', (req, res) => {
//   const users = [
//     {
//       'id': 1,
//       'name': 'Carlos',
//       'middle-name': 'Adonis',
//       'last-name':  'Vara'
//     },
//     {
//       'id': 5,
//       'name': 'Carlos',
//       'middle-name': 'Adonis',
//       'last-name':  'Vara'
//     },
//     {
//       'id': 3,
//       'name': 'Carlos',
//       'middle-name': 'Adonis',
//       'last-name':  'Vara'
//     },
//   ]
//   res.send(users);
// });
//
// app.get('/users/userId', (req, res) => {
//   const user = {
//     'id': req.params.userId,
//     'name': 'Carlos'
//   }
//   res.send(user);
// });

app.listen(3000, () => console.log('My cute app is running on port 3000!'));
