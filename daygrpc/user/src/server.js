const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader');
// import grpc from '@grpc/grpc-js'
// import protoLoader from '@grpc/proto-loader'
const sequelize = require('./config/db');
const User = require('./models/user');

const userLoader = protoLoader.loadSync('./user.proto');
const userProto = grpc.loadPackageDefinition(userLoader);


const server = new grpc.Server();

const saveUser = async(args,callback)=>{
    console.log('Request value from client : ',args.request);
    // DB logic
    
    const {id,  userName, email} = args.request;

   const savedData = await User.create({
        id, userName, email
    });

    callback(null,savedData);
};


const userinfo = async (_,callback)=>{
    // db logic
    // ex. const users = await User.findAll();
    const users = await User.findAll();
   
    callback(null,{users});
}


server.addService(userProto.UserService.service,{
    createUser:saveUser,
    getUsers:userinfo
});

server.bindAsync("localhost:4000",grpc.ServerCredentials.createInsecure(),(err,port)=>{
    if(err){
        console.error(err);
        return;
    }
    console.log(`gRPC server listening on port ${port}`);
    server.start();
    sequelize.sync({ force: true });
});