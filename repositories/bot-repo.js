const url = process.env.ConnectionString;
const collection = 'bot-works';

const mongoose = require('mongoose');
const botWorkModel = require('../models/botworkModel');
const schema = botWorkModel.botWorkModel();
const BotWork = mongoose.model(collection, schema);

mongoose.connect(url, { useNewUrlParser: true });
//  const client = new mongoose.connect(url, { useNewUrlParser: true });

//Ép Mongoose sử dụng thư viện promise toàn cục
mongoose.Promise = global.Promise;

//Lấy kết nối mặc định
var db = mongoose.connection;

//Ràng buộc kết nối với sự kiện lỗi (để lấy ra thông báo khi có lỗi)
db.on('error', function () {
    console.error('MongoDB connection error:');
});

exports.getRunWorks = function () {
    return BotWork.find()
    .where('isEnabled').equals(true).where('isSended').equals(false);
}

exports.setIsSended = function(botwork, isSended){
    // botwork.isSended = isSended;
    return BotWork.update({ id: botwork.id },{
        isSended: isSended
    });
}

exports.setIsSendedAll = function(isSended){
    return BotWork.updateMany({"isEnabled": true}, {"$set":{"isSended": isSended}});
}
