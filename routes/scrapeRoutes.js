const cheerio = require("cheerio");
const axios = require("axios");
const db = require("../models");

module.exports = function (app) {

    app.get("/scrape", function (req, res) {

        let results = []
        axios.get("https://www.cnet.com/news/").then(response => {

            let $ = cheerio.load(response.data);

            $(".fdListing").children().each((i, element) => {

                let headline = $(element).find("h3").find("a").text().trim()
                let link = $(element).find("p").find("a").attr("href")
                let summary = $(element).find("p").find("a").text().trim()
                let image = $(element).find("figure").find("span").find("img").attr("data-original")

                let picture = (image !== undefined) ? image : '';
                let url = (link !== undefined) ? "https://www.cnet.com" + link : '';


                results.push({
                    headline: headline,
                    url: url,
                    summary: summary,
                    picture: picture,
                    snippet: ''
                })



            });




        }).then(() => {

            let getSnippet = function (url) {
                return axios.get(url)
                    .then((res) => {
                        let $ = cheerio.load(res.data);
                        return $(".speakableTextP2").text()
                    })

            }


            async function setSnippet() {
                for (let i = 0; i < results.length; i++) {
                    data = results[i]
                    // console.log(data.url)
                    let newurl = data.url;
                    if (newurl !== "") {
                        results[i].snippet = await getSnippet(newurl)
                    }
                }
                let infoInResults = results.values()
                for (let data of infoInResults) {
                    if (data.headline !== "") {
                        saveToDatabase(data);
                    }
                }
            }

            setSnippet();

            function saveToDatabase(newResults) {
                db.Article.findOrCreate(newResults)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

                // res.send("Scrape Complete");
            }

        })

    });

}

