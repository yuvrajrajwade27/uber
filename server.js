import {app} from "./app.js";
import * as http from "http";
const port = process.env.PORT || 3000;


const server = http.createServer(app);



server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});