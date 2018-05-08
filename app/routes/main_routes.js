var ObjectID = require('mongodb').ObjectID;
var themessage = '';
var articles;

module.exports = function(app, db){
    app.get('/:page?', (req,res) => {
        const page = req.params.page;
        /*const details = {'_id': new ObjectID(id)}*/
        db.collection('articles').find({}).toArray((err,item)=>{
            ilength=item.length;
        })
        db.collection('articles').find({}).limit(20).skip(page*20).toArray((err, item) => {
            if(err){
                res.send({'error': 'there is an error'})
            } else {
                if(item.length)
                res.render('index',{data:item,message:themessage,articles:ilength});
            }
        })
    })
    app.post('/addArticle', (req,res) => {
        //validate
        if(req.body.title==""||req.body.nickname==""||req.body.content==""){
            res.redirect('/');
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
            
            const newArticle = {
                title: req.body.title,
                nickname: req.body.nickname,
                content: req.body.content,
                created_date: today,
                comments: []
            }
            db.collection('articles').insert(newArticle, (err,result) => {
                if(err) {
                    res.redirect('/');
                    themessage="an error has occured";
                } else {
                    res.redirect('/');
                    themessage="success insert";
                }
            })
        }
    })
}