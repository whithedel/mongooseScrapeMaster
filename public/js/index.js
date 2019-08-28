const $noteBtnDelete = $("#noteBtnDelete")
const $noteBtn = $("#noteBtn")
const $author = $("#author")
const $inputTitle = $("#inputTitle")
const $commentSection = $("#commentSection")
const $noteForm = $("#noteForm")
const $newArticle = $("#newArticle")

const httpRequest = {
    deleteNote: function(id){
        return axios.delete(`/note/${id}`)
    },

     postComment: function(data) {
         return axios.post("/articles/note", {
             author : data.author,
             title: data.title,
             commentSection: data.commentSection,
             id: data.id
         })
     },

     scrapeNewArticle: function() {
         return axios.get("/")
     }
}

const clickHandler = {

    handleDeleteBtn : function(event) {
        event.preventDefault();
    
        let id = $noteBtnDelete.attr("data-noteId")
    
        console.log(id)
    
        httpRequest.deleteNote(id)
        .then(response => location.reload())
    
    },

    handleSaveNoteBtn : function (event) {
        event.preventDefault();

        data = {
            author : $author.val().trim(),
            title : $inputTitle.attr("value"),
            commentSection : $commentSection.val().trim(),
            id : $noteForm.attr("data-articleId")
        }

        httpRequest.postComment(data)
        .then(response => location.reload())

    },

    handleScrapeNewArticle : function () {
        httpRequest.scrapeNewArticle()
        .then(response => {
            alert("If new articles are found we will display them in a few seconds Thank you")
            function LoadArticle() { 
                window.location.href = "/articles";
                alert("Scrape complete!")
        };
            setTimeout(LoadArticle, 5000)
        } )
    }

}



$noteBtnDelete.on("click", clickHandler.handleDeleteBtn)
$noteBtn.on("click", clickHandler.handleSaveNoteBtn)
$newArticle.on("click", clickHandler.handleScrapeNewArticle)