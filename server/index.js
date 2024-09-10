const express = require("express");
const NodeCache = require("node-cache");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8080;
app.use(cors());

const myCache = new NodeCache({ stdTTL: 3600 });

app.use(bodyParser.json());

app.get("/users", (req, res) => {
  const allKeys = myCache.keys();
  const users = allKeys.map((key) => myCache.get(key));

  if (users.length === 0) {
    return res.status(404).json({
      status: "error",
      message: "Users not found",
      users: [],
    });
  }
  return res.json({
    status: "success",
    message: "List of all users",
    users: users,
  });
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
    });
  }

  const existingUser = myCache.get(email);
  if (existingUser) {
    return res.status(400).json({
      status: "error",
      message: "A user with this email already exists",
    });
  }

  myCache.set(email, { email, password });

  return res.json({
    status: "success",
    message: "Registration was successful",
    user: {
      email,
    },
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
    });
  }

  const cachedUser = myCache.get(email);
  if (cachedUser) {
    return res.json({
      status: "success",
      message: "Authentication successful",
      user: { email: cachedUser.email },
    });
  } else {
    return res.json({
      status: "error",
      message: `Authentication failed. This email ${email} is not exist`,
      user: { email },
    });
  }
});

app.post("/update", (req, res) => {
  const { email, password, new_email, new_password } = req.body;

  if (!email || !password || !new_email || !new_password) {
    return res.status(400).json({
      status: "error",
      message: "All fiedls are required",
    });
  }

  const cachedUser = myCache.get(email);

  if (!cachedUser) {
    return res.status(404).json({
      status: "error",
      message: `User with email ${email} not founded.`,
    });
  }

  if (cachedUser.password !== password) {
    return res.status(401).json({
      status: "error",
      message: "Wrong password",
    });
  }
  myCache.del(email);
  myCache.set(new_email, { email: new_email, password: new_password });

  return res.json({
    status: "success",
    message: "Data updated successfully",
    user: {
      email: new_email,
    },
  });
});

app.listen(port, () => {
  console.log(`Server start on ${port}`);
});
