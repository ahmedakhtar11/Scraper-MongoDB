$(document).ready(function() {

	// 'Confirm Delete' Modal, after Clicking "Delete Articles"
    $("#delete").click(function(){

    	$("#myModal").modal('show');
    	
    });

    $(".deletesingle").click(function(){

    	$("#deletesingle").modal('show');

    });

    	// Ajax Call to run Scrape after clicking "Scrape Articles"
    $("#scrape").click(function(e){

    	e.preventDefault();	

    	$.ajax({
		    type: "GET",
		    url: "/scrape",
		    success: function(response) {
		    	
		    	location.reload();
		    }		
		});
    });

   // Save Articles after clicking "Save Articles."
    $(".saveBtn").click(function(e){

    	var selected = $(this);	

    	$.ajax({
		    type: "GET",
		    url: "/saved/" + selected.attr("data-id"),
		    success: function() {
		    	$("#success").modal()
		    }
		});
    });

    //Modal for Viewing the Article Notes.
    $(".viewnote").click(function(){

    	var selected = $(this);

    	$("#notespot").html("");

    	$.ajax({
		    type: "GET",
		    url: "/note/" + selected.attr("data-id")
		}) 
		.done(function(data) {
			
		    $("#notetitle").html("Note for Article " + selected.attr("data-id"))
		    
		    if (!data.article.note) {
		    	$("#notespot").html("<p class='card-text col-md-12' id='modalnote'>" + "No Notes Yet" + 
		    	"</p>")
		    }

		    for (var i = 0; i < data.article.note.length; i++) {

				// Appending the notes
		    	$("#notespot").append("<p class='card-text col-md-12' id='modalnote'>" + data.article.note[i].note + 
		    	"<span><button type='button' class='btn btn-danger' data-id='"+data.article.note[i]._id+
		    	"' id='deletenote'>X</button></span></p>")
		    }
		    	
			$("#article-note-modal").modal();
		    $(".savenotes").attr("data-id", data.ArticleId);			

		});
    });

    //Save the Notes
    $(".savenotes").click(function(e){

    	var selected = $(this);

    	var ArticleId = selected.attr("data-id");

    	var note = $("#new-note").val().trim();

    	if(note){

    		$.ajax({
			    type: "POST",
				url: "/save/note/" + ArticleId,
				data: {
					note: note
				}
			}).done(function(data) {

				//Appending the Notes
		    	$("#notespot").append("<p class='card-text col-md-12' id='modalnote'>" + data.note.note + 
		    	"<span><button type='button' class='btn btn-danger' data-id='"+data.note._id+
		    	"' id='deletenote'>X</button></span></p>");
		    	
			    $(".savenotes").attr("data-id", ArticleId);
				$("#article-note-modal").modal();
				$("#new-note").val("");

			});
	    }; 
    });

    $(document).on("click", "#deletenote", function(){
    	
    	$(this).parent().parent().remove();

    	var selected = $(this);

    	$.ajax({	
		    type: "GET",
		    url: "/delete/" + selected.attr("data-id")
		});
    })

});

