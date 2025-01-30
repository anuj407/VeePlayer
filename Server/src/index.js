import dotenv from 'dotenv';
import db from './db/db.js';
import { app } from './app.js';
dotenv.config()
db()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => console.log(`Server running on port ${process.env.PORT}`));
})
 .catch((err) => console.error(err));