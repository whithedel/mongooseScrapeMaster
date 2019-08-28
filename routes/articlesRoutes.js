const db = require("../models");

module.exports = function (app) {

    app.get("/articles", function (req, res) {
        db.Article.find({}).sort({_id : -1}).limit(24)
            .then(function (dbArticle) {
                console.log(dbArticle);
                res.render("articles", {
                    article : dbArticle
                })
            })
            .catch(function (err) {
                res.json(err);
            });
    });

}
