const { createClient } =require('redis') ;

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-12296.c264.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 12296
    }
});

module.exports=redisClient;

