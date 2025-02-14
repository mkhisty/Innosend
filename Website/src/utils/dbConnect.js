import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI

<<<<<<< HEAD
let cached = global.mongoose = { conn: null, promise: null }
  
=======
let cached = { conn: null, promise: null }  

>>>>>>> 6b212b14a9f2269b23ae69e9dbdc6c52aa7b673b
async function dbConnect() {
    if (cached.conn) {
      return cached.conn
    }
    if (!cached.promise) {
      cached.promise = await mongoose.connect(MONGO_URI)
      
    }
    try {
      cached.conn = await cached.promise
    } catch (e) {
      cached.promise = null
      throw e
    }
  
    return cached.conn
  }
<<<<<<< HEAD
  
  export default dbConnect
=======

await dbConnect()

export default dbConnect
>>>>>>> 6b212b14a9f2269b23ae69e9dbdc6c52aa7b673b
