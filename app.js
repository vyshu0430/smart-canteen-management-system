const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const session = require('express-session'); // Import express-session

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing POST request bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for sessions
app.use(session({
  secret: 'your-secret-key', // Change this to a secure random string
  resave: false,
  saveUninitialized: true,
}));

// Path to the JSON file where user data is stored
const usersFile = path.join(__dirname, 'data', 'users.json');

// Ensure that the users.json file exists
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, '[]');
}

// Function to read users from JSON file
function readUsers() {
  try {
    const data = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Function to write users to JSON file
function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/registration', (req, res) => {
  res.render('registration'); // This will look for registration.pug
});


// Other routes...

// Registration route
app.post('/register', async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;
  const users = readUsers();

  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.render('registration', { title: 'Register', error: 'Username already exists' });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store user data securely
  users.push({
    username,
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  // Save updated users to the JSON file
  writeUsers(users);

  // Redirect to the dashboard page
  res.redirect('/dashboard');
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  // Find the user by username
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.render('login', { title: 'Login', error: 'Invalid username or password' });
  }

  // Compare the entered password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.render('login', { title: 'Login', error: 'Invalid username or password' });
  }

  // Store user information in session to keep them logged in
  req.session.user = user;

  // Redirect to the dashboard
  res.redirect('/dashboard');
});

// Dashboard route after registration/login
app.get('/dashboard', (req, res) => {
  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/login'); // Redirect to login if not logged in
  }
  
  res.render('dashboard', { title: 'Dashboard', user: req.session.user });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Payment Intent creation code (optional for your use case)
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card']
        });
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});




