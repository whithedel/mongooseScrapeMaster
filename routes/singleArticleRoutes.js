const db = require("../models");
const axios = require("axios");
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

    app.post("/articles/note", function (req, res) {
        console.log(req.body)
        const noteInfo = {
            author: req.body.author,
            title: req.body.title,
            commentSection: req.body.commentSection
        }
        db.Note.create(noteInfo)
            .then(function (dbNote) {
                
                return db.Article.findOneAndUpdate({ _id: req.body.id }, {$push:{ note: dbNote._id }} );
            })
            .then(function (dbArticle) {
                res.end();
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete("/note/:id", function(req, res) {
        db.Note.deleteOne({_id: req.params.id})
        .then(function (dbNote) {
            res.end()
        })
    })

}