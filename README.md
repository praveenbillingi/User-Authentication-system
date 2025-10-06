# User-Authentication-system

STEP 1:Initialize the Project
mkdir auth-system && cd auth-system
npm init -y
npm install express mongoose passport passport-local express-session bcryptjs ejs

STEP 2:Create MongoDB Model (models/User.js)

STEP 3:Configure Passport (config/passportConfig.js)

STEP 4:Back-End Routes (routes/authRoutes.js)

STEP 5:Dashboard Route (routes/dashboard.js)

STEP 6:Main Server File (server.js)

STEP 7:Frontend (views/ register.ejs, login.ejs, dashboard.ejs)

STEP 8:Run the Application
node server.js

#PROJECT STRUTURE
auth-system/
│
├── server.js
├── package.json
├── config/
│   └── passportConfig.js
├── models/
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── dashboard.js
├── views/
│   ├── login.html
│   ├── register.html
│   └── dashboard.html
└── public/
    └── style.css
