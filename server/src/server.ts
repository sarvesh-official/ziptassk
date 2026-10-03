import app from "./app"
import connectDatabase from "./config/database";


const PORT = Number(process.env.PORT) || 4000;


const startServer = async() => {

    await connectDatabase();

    app.listen(PORT, () => {
        
        console.log(`Server is running at ${PORT}`);
    });

}

startServer();
