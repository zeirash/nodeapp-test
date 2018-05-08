var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db){
    app.post('/addReply/:aid/:cid', (req,res) => {
        const aid = req.params.aid;
        const cid = req.params.cid;
        console.log(typeof cid);
        console.log(req.body);
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 
        if(mm<10) {
            mm = '0'+mm
        } 
        today = mm + '/' + dd + '/' + yyyy;
        var rid=new ObjectID();
        const newReply = {
            _id: rid,
            nickname: req.body.nickname,
            content: req.body.content,
            created_date: today
        }

        db.collection('articles').update({"_id": ObjectID(aid), "comments._id": ObjectID(cid)},
        {"$push":{"comments.$.replies": newReply}}, (err,result) => {
            if(err) {
                res.redirect('/article/'+aid);
                themessage="an error has occured";
            } else {
                res.redirect('/article/'+aid);
                themessage="success insert comment";
            }
        })
    })
}