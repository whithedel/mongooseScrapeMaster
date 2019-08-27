module.exports = function (app) {
    
    // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    console.log("i got called 404");
    res.render("404");
  });

}