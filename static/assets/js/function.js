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



// $(document).ready(function (){
//     $(".filter-checkbox").on("click", function(){
//         let filter_object = {}
//         $(".filter-checkbox").each(function(){
//             let filter_value = $(this).val()
//             let filter_key = $(this).data("filter")

//             filter_object[filter_key] = Array.from(document.querySelectorAll('input[data-filter=' + filter_key + ']:checked')).map(function(element){
//                 return element.value
//             })
//         $.ajax({
//             url: '/filter-products',
//             data: filter_object,
//             dataType: 'json',
//             beforeSend: function() {
//             },
//             success: function(response) {
//                 $("#filtered-product").html(response.data)
//             },
//         })
//         })
//     })
// })

$(document).ready(function (){
    $(".filter-checkbox, #price-filter-btn").on("click", function(){
        console.log("A checkbox have been clicked");

        let filter_object = {}

        let min_price = $("#max_price").attr("min")
        let max_price = $("#max_price").val()

        filter_object.min_price = min_price;
        filter_object.max_price = max_price;

        $(".filter-checkbox").each(function(){
            let filter_value = $(this).val()
            let filter_key = $(this).data("filter") // vendor, category

            // console.log("Filter value is:", filter_value);
            // console.log("Filter key is:", filter_key);

            filter_object[filter_key] = Array.from(document.querySelectorAll('input[data-filter=' + filter_key + ']:checked')).map(function(element){
                return element.value
            })  
        })
        console.log("Filter Object is: ", filter_object);
        $.ajax({
            url: '/filter-products',
            data: filter_object,
            dataType: 'json',
            beforeSend: function(){
                console.log("Trying to filter product...");
            },
            success: function(response){
                console.log(response.length);
                console.log("Data filtred successfully...");
                $(".totall-product").hide()
                $("#filtered-product").html(response.data)
            }
        })
    })

    $("#max_price").on("blur", function(){
        let min_price = $(this).attr("min")
        let max_price = $(this).attr("max")
        let current_price = $(this).val()

        // console.log("Current Price is:", current_price);
        // console.log("Max Price is:", max_price);
        // console.log("Min Price is:", min_price);

        if(current_price < parseInt(min_price) || current_price > parseInt(max_price)){
            // console.log("Price Error Occured");

            min_price = Math.round(min_price * 100) / 100
            max_price = Math.round(max_price * 100) / 100

            
            // console.log("Max Price is:", min_Price);
            // console.log("Min Price is:", max_Price);

            alert("Price must between $" +min_price + ' and $' +max_price)
            $(this).val(min_price)
            $('#range').val(min_price)

            $(this).focus()

            return false
        }
    })
})