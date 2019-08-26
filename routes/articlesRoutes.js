const db = require("../models");

module.exports = function (app) {

    app.get("/articles", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                console.log(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

}
