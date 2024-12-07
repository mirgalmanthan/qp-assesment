"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//create a server in express where i have a default route with get and the server runs on port 5000. make necessary changes required
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
