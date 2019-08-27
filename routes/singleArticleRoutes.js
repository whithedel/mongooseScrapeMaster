const db = require("../models");

module.exports = function (app) {
    app.get("/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate( {path: "note", options: {sort: {"_id" : -1} } } )
            .then(function (dbArticle) {
                console.log(dbArticle.note)
                res.render("articleWithNote", {
                    article : dbArticle
                })
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post("/articles/:id", function (req, res) {
        
        db.Note.create(req.body)
            .then(function (dbNote) {
                
                return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push:{ note: dbNote._id }} );
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

}