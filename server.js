require("dotenv").config();
const express = require("express");
const axios = require("axios");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const collection = require("./mongodb");
const path = require("path");

const app = express();
const PORT = 8000;

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  
}));

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

app.get("/", (req, res) => {
    res.send("Recipe Finder API is Running!");
});

app.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await collection.findOne({ name }); 
        
        if (!user) {
            return res.status(400).json({ 
                message: "User does not exist" 
            });
        }

        if (user.password !== password) {
            return res.status(400).json({ 
                message: "Incorrect password" 
            });
        }

        res.json({
            user: {
                id: user._id,
                name: user.name
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Server error during login" 
        });
    }
});
app.post('/signup', async (req, res) => {
    try {
        const { name, password } = req.body;
        const existingUser = await collection.findOne({ name });
        
        if (existingUser) {
            return res.status(400).json({ 
                message: "User already exists" 
            });
        }

        const newUser = new collection({ 
            name, 
            password 
        });

        await newUser.save();

        res.status(201).json({
            user: {
                id: newUser._id,
                name: newUser.name
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Server error during signup" 
        });
    }
});
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.json("logged out");
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



