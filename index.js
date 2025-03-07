const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./DbConnect/db.connect");
const dotenv = require("dotenv");

dotenv.config();
initializeDatabase();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/leads", require("./routes/leadsRoutes"));
app.use("/api/salesAgents", require("./routes/salesAgentRoutes"));
app.use("/api/tags", require("./routes/tagRoutes"));
app.use("/api/comments/", require("./routes/commentsRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
