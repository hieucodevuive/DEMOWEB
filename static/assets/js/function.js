console.log("working fire 2");
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



$(document).ready(function (){
    $(".filter-checkbox").on("click", function(){
        let filter_object = {}
        $(".filter-checkbox").each(function(){
            let filter_value = $(this).val()
            let filter_key = $(this).data("filter")

            filter_object[filter_key] = Array.from(document.querySelectorAll('input[data-filter='+ filter_key+']:checked')).map(function(e){
                return e.value
            })
            $.ajax({
                url: '/filter-products',
                data: filter_object,
                dataType: 'json',
                beforeSend: function() {
                },
                success: function(response) {
                    $("#filltered-product").html(response.data)
                },
            })
        })
    })
})