var express = require('express');
var app = express();
app.post('/', (req, res) => {
  res.status(201).send('User added successfully');
});
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.put('/', function (req, res) {
  res.send('User putted successfully');
});
app.delete('/', function (req, res) {
  res.send('User deleted successfully');
});
app.listen(3000, function () {
  console.log('Server đã bắt đầu lắng nghe trên cổng 3000.');
});













// // Import module Express
// const express = require('express');

// // Khởi tạo ứng dụng Express
// const app = express();

// // Thiết lập middleware để xử lý JSON trong request body
// app.use(express.json());

// // Danh sách các người dùng (sẽ thay thế bằng cơ sở dữ liệu thực tế trong môi trường sản phẩm)
// let users = [];

// // Route GET trả về danh sách tất cả người dùng
// app.get('/users', (req, res) => {
//   res.json(users);
// });

// // Route GET trả về thông tin của một người dùng cụ thể dựa trên id
// app.get('/users/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const user = users.find(user => user.id === id);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: 'User not found' });
//   }
// });

// // Route POST để thêm một người dùng mới
// app.post('/users', (req, res) => {
//   const newUser = req.body;
//   users.push(newUser);
//   res.status(201).json(newUser);
// });

// // Route PUT để cập nhật thông tin của một người dùng cụ thể dựa trên id
// app.put('/users/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const updateUser = req.body;
//   const index = users.findIndex(user => user.id === id);
//   if (index !== -1) {
//     users[index] = { ...users[index], ...updateUser };
//     res.json(users[index]);
//   } else {
//     res.status(404).json({ message: 'User not found' });
//   }
// });

// // Route DELETE để xóa một người dùng cụ thể dựa trên id
// app.delete('/users/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = users.findIndex(user => user.id === id);
//   if (index !== -1) {
//     users.splice(index, 1);
//     res.json({ message: 'User deleted successfully' });
//   } else {
//     res.status(404).json({ message: 'User not found' });
//   }
// });

// // Khởi động máy chủ và lắng nghe trên cổng 3000
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
