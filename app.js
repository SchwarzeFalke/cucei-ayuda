/**
 * @Author: schwarze_falke
 * @Date:   2018-09-13T13:50:03-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-13T14:17:34-05:00
 */

const express = require('express');

const app = express();

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
