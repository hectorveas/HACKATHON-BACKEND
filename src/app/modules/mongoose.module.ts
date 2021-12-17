import mongoose, { ConnectionOptions } from "mongoose";


function connect(): Promise<typeof mongoose> {
  const options: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
  
  return mongoose.connect(`${process.env['MONGO_URI']}/${process.env['MONGO_DATABASE_NAME']}`, options);
}

export default { connect };
