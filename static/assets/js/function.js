console.log("working fine");

$("#commentForm").submit(function(e){
    e.preventDefault();

    $.ajax({
        data: $(this).serialize(),

        method: $(this).attr("method"),

        url: $(this).attr("action"),

        dataType: "JSON",

        success: function(res){
            console.log("Comment Saved to DB...");

            if(res.bool == true ){
                 $("#review-res").html("Review added successfully.")
                 $(".hide-comment-form").hide()
            }

        }
        })
})