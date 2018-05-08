var ObjectID = require('mongodb').ObjectID;
var themessage = '';

module.exports = function(app, db){
    app.get('/article/:id', (req,res) => {
        var themessage = req.query.message;
        const id = req.params.id;
        const details = {'_id': ObjectID(id)};
        db.collection('articles').findOne(details,(err, item) => {
            if(err){
                res.send({'error': 'there is an error'})
            } else {
                res.render('article_detail',{data:item, message:themessage});
            }
        })
        //res.render('article_detail')
        
    })
    app.post('/addComment/:id', (req,res) => {
        const id = req.params.id;
        if(req.body.nickname==""||req.body.content==""){
            res.redirect('/article/'+id);
            themessage="all fields must not empty";
        }
        else {
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
            var cid= new ObjectID();
            const newComment = {
                _id: cid,
                nickname: req.body.nickname,
                content: req.body.content,
                created_date: today,
                replies: []
            }
        
            db.collection('articles').update({"_id": ObjectID(id)},
            {"$push":{"comments": newComment}}, (err,result) => {
                if(err) {
                    res.redirect('/article/'+id);
                    themessage="an error has occured";
                } else {
                    res.redirect('/article/'+id);
                    themessage="success insert comment";
                }
            })
        }
    })
}