console.log("working fire 1");
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

    $(".add-to-cart-btn").on("click", function(){
    
        let this_val = $(this)
        let index = this_val.attr("data-index")
       
        let quantity = $(".product-quantity-"+ index).val()
        let product_id = $(".product-id-"+ index).val()
        let product_title = $(".product-title-"+ index).val()
        let product_price = $(".current-product-price-"+ index).text()
        let product_pid = $(".product-pid-"+ index).val()
        let product_image = $(".product-image-"+ index).val()
    
        console.log("############");
        console.log("quantity: ", quantity);
        console.log("product_title: ", product_title);
        console.log("product_id: ", product_id);
        console.log("product_price: ", product_price);
        console.log("product_pid: ", product_pid);
        console.log("product_image: ", product_image);
    
        $.ajax({
            url:'/add-to-cart',
            data:{
                'id':product_id,
                'pid':product_pid,
                'image':product_image,
                'qty':quantity,
                'title':product_title,
                'price':product_price,
                },
            dataType: 'json',
            beforeSend: function(){
                console.log("Adding Product to Cart...");
            },
            success: function(response){
                this_val.html("✓")
                $(".cart-items-count").text(response.totalcartitems)
                this_val.attr('disabled',false);
                }            
        })
    })
    
    $(".delete-product").on("click", function(){
        let product_id = $(this).attr("data-product")
        let this_val = $(this)

        console.log("product_id: ", product_id);

        $.ajax({
            url: "/delete-from-cart",
            data: {
                "id": product_id,
    
            },
            dataType: "json",
            beforeSend: function(){
                this_val.hide()
            },
            success: function(response){
                this_val.show()
                $(".cart-items-count").text(response.totalcartitems)
                $("#cart-list").html(response.data)
            }
        })
    })

    $(".update-product").on("click", function(){
        let product_id = $(this).attr("data-product")
        let product_qty = $(".product-qty-"+product_id).val()
        let this_val = $(this)

        console.log("product_id: ", product_id);
        console.log("product_qty: ", product_qty);

        $.ajax({
            url: "/update-cart",
            data: {
                "id": product_id,
                "qty": product_qty,
            },
            dataType: "json",
            beforeSend: function(){
                this_val.hide()
            },
            success: function(response){
                this_val.show()
                $(".cart-items-count").text(response.totalcartitems)
                $("#cart-list").html(response.data)
            }
        })
    })

    // Making to defautl address
    $(document).on("click", ".make-default-address", function(){
        let id = $(this).attr("data-address-id")
        let this_val = $(this)

        console.log("ID is:", id);
        console.log("Element is:", this_val);

        $.ajax({
            url: "/make-default-address",
            data: {
                "id":id
            },
            dataType: "json",
            success: function(response){
                console.log("Address Made Default....");
                if (response.boolean == true){

                    $(".check").hide()
                    $(".action_btn").show()

                    $(".check"+id).show()
                    $(".button"+id).hide()

                }
            }
        })
    })


    //Adding to wishlist
    $(document).on("click", ".add-to-wishlist", function(){
        let product_id = $(this).attr("data-product-item")
        let this_val = $(this)

        console.log("product_id: "+product_id);

        $.ajax({
            url: "/add-to-wishlist",
            data: {
                "id": product_id,
            },
            dataType: "json",
            beforeSend: function(){
                console.log("Adding to wishlist");
            },
            success: function(response){
                this_val.html("✓")
                if(response.bool) {
                    console.log("Added to wishlist");
                }
            },
        })

    })
    
    //Remove from wishlist delete-wishlist-product
    $(document).on("click", ".delete-wishlist-product", function(){
        let this_val = $(this)
        let product_id = $(this).attr("data-wishlist-product")

        console.log("product id:", product_id);
        $.ajax({
            url: "/remove-wishlist",
            data: {
            "id": product_id
            },
            dataType: "json",
            beforeSend: function(){
            console.log("Deleting...");
            },
            success: function(res){
            $("#wishlist-list").html(res.data)
            }
            })
    })
})

