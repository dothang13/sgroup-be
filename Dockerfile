FROM node:16-alpine

# Đặt thư mục làm việc
WORKDIR /sgroup/backend

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Cài đặt Babel toàn cầu bao gồm cả babel-node
RUN npm install -g @babel/core @babel/cli @babel/node

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Biên dịch mã nguồn
RUN npm run build-src

# Khởi động ứng dụng
CMD ["npm", "start"]

#docker build --tag node-docker
#docker run -p 8080:8080 -d node-docker
