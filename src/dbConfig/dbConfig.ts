import mongoose from 'mongoose';

export async function connect(){
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MONGO_URI environment variable is not defined.');
        }
        mongoose.connect(mongoUri);
        const connection = mongoose.connection;

        connection.on('connected' ,() => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error' , (err) => {
            console.log('error' , ()=>{
                console.log('Mongo connection error . Please make sure MongoDB is running. ' + err);
                process.exit();
            })
        })
    } catch (error) {
        console.log('Something goes wrong');
        console.log(error);
    }
} 