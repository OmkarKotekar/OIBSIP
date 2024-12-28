const express = require("express");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

// MongoDB Configuration
const url = "mongodb://127.0.0.1:27017";
const dbName = "oasis"; // Database name
let db;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// MongoDB Connection
async function connectToDB() {
    try {
        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB");
        db = client.db(dbName); // Store the DB instance globally
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
    }
}

// Routes
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const collection = db.collection("users");

        // Check if the user already exists
        const existingUser = await collection.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password and save user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword };
        const result = await collection.insertOne(newUser);

        res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const collection = db.collection("users");
        const user = await collection.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        res.json({ message: "Login successful" });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Fallback for dashboard.html
app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Start Server
app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
    await connectToDB(); // Connect to the database before handling requests
});
