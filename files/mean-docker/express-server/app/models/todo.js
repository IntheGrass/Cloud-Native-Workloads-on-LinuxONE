var mongoose = require('mongoose');

// Define the schema 数据库格式
module.exports = mongoose.model('Todo', {
    id:{
        type: Number,
        default: 0
    },

    username: {
        type: String,
        default: ''
    }, //用户名

    password: {
        type: String,
        default: ''
    }, //密码

    balance: {
        type: Number,
        default: 0
    },  //存款余额
    
    arrears: {
        type: Number,
        default: 0
    } //欠款金额
    
    
    //phone
    //理财产品
   
});
