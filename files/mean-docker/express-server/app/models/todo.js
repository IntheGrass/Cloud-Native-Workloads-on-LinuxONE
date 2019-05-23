var mongoose = require('mongoose');

// Define the schema 数据库格式
module.exports = mongoose.model('Todo', {
    username: {
        type: String,
        default: ''
    }, //用户名

    balance: {
        type: String,
        default: ''
    }  //存款余额


    //密码
    //phone
    //理财产品
    //欠款金额
});
