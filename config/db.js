import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const url = "mongodb://0.0.0.0:27017/skincare";
    // const conn = await mongoose.connect(process.env.MONGO_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    // });

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });

    console.log(`Connected To MongoDB Database ${url}`.bgMagenta.white);
  } catch (error) {
    console.log(`Error in MongoDB: ${error}`.bgRed.white);
  }
};

export default connectDB;


// const url = "mongodb://0.0.0.0:27017/Relationship";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("Database connected successfully");
//   } catch (err) {
//     console.log(err);
//   }
// };

// connectDB();