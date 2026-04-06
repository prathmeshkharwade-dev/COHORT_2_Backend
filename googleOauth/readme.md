# 🔐 Google OAuth 2.0 with Node.js & JWT

A Node.js application implementing Google OAuth 2.0 authentication using Passport.js and JSON Web Tokens (JWT).

---

## 📋 Prerequisites

Before getting started, ensure you have the following:

- [Node.js](https://nodejs.org/) installed on your machine
- A Google account to create OAuth credentials
- Basic knowledge of JavaScript and Node.js

---

## 🚀 Getting Started

### Step 1: Set Up Google OAuth Credentials

1. **Access the [Google Cloud Console](https://console.cloud.google.com/)** and sign in.

2. **Create a New Project:**
   - Click the project dropdown at the top
   - Select **"New Project"**
   - Enter a project name and click **"Create"**

3. **Enable the OAuth Consent Screen:**
   - Go to **APIs & Services > OAuth consent screen**
   - Choose **"External"** and click **"Create"**
   - Fill in the required fields:
     - **App name:** Your application's name
     - **User support email:** Your email address
     - **Developer contact information:** Your email address
   - Click **"Save and Continue"**

4. **Create OAuth 2.0 Credentials:**
   - Go to **APIs & Services > Credentials**
   - Click **"Create Credentials"** → **"OAuth client ID"**
   - Choose **"Web application"**
   - Set the **Authorized redirect URI** to:
     ```
     http://localhost:3000/auth/google/callback
     ```
   - Click **"Create"**
   - 📝 Copy your **Client ID** and **Client Secret**

---

### Step 2: Initialize the Node.js Project

```bash
# Create and navigate to project directory
mkdir google-auth-jwt
cd google-auth-jwt

# Initialize Node.js project
npm init -y
```

---

### Step 3: Install Dependencies

```bash
npm install express passport passport-google-oauth20 jsonwebtoken dotenv morgan
```

| Package | Description |
|---|---|
| `express` | Web framework for Node.js |
| `passport` | Authentication middleware |
| `passport-google-oauth20` | Google OAuth 2.0 strategy for Passport |
| `jsonwebtoken` | Library to work with JSON Web Tokens |
| `dotenv` | Loads environment variables from `.env` file |
| `morgan` | HTTP request logger middleware |

---

### Step 4: Configure Environment Variables

Create a `.env` file in the root of your project:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-jwt-secret
PORT=3000
```

> ⚠️ **Never commit your `.env` file to Git!** Add it to `.gitignore`.

---

### Step 5: Set Up the Express Application

Create `server.js` (or `app.js`) in your project root:

```js
import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(passport.initialize());

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // TODO: Find or create user in your database
      // const user = await User.findOrCreate({ googleId: profile.id });
      return done(null, profile);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, displayName: req.user.displayName },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  }
);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```

---

## 📁 Project Structure

```
google-auth-jwt/
├── server.js
├── .env              # ← NOT committed to Git
├── .gitignore
├── package.json
└── node_modules/     # ← NOT committed to Git
```

---

## 🛡️ .gitignore

Make sure your `.gitignore` includes:

```gitignore
node_modules/
.env
.env.local
*.log
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/auth/google` | Initiates Google OAuth flow |
| `GET` | `/auth/google/callback` | Google redirect callback — returns JWT |

---

## 🧪 Testing the Flow

1. Start the server:
   ```bash
   node server.js
   # or with nodemon
   npx nodemon server.js
   ```

2. Open your browser and go to:
   ```
   http://localhost:3000/auth/google
   ```

3. Sign in with Google — you'll receive a **JWT token** in the response.

---

## 📦 Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Passport.js](http://www.passportjs.org/)
- [passport-google-oauth20](https://www.npmjs.com/package/passport-google-oauth20)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [morgan](https://www.npmjs.com/package/morgan)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).