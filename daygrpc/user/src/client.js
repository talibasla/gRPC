const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader');
const userLoader = protoLoader.loadSync('./user.proto');
const userProto = grpc.loadPackageDefinition(userLoader);

const client = new userProto.UserService(
    "localhost:4000",
    grpc.credentials.createInsecure()
);


const fv = (err, msg)=>{
    console.log('Response Value from server : ',msg);
}


// client.createUser(
//     {id:2,userName:"adarsh1",email:'adarsh1@gmail.com'}
//     , fv)

client.getUsers({},(err,msg)=>{
    console.log('value is : ',msg);
})