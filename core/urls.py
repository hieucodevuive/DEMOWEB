from os import name
from django.urls import path, include
from core.views import (
    ajax_add_review, 
    tag_list, 
    category_list_view, 
    category_product_list_view, 
    index, 
    product_detail_view, 
    product_list_view, 
    vendor_detail_view, 
    vendor_list_view, 
    search_view,
    filter_product,
    add_to_cart,
    cart_view,
    delete_item_from_cart,
    update_cart,
    checkout_view,
    payment_completed_view,
    payment_failed_view,
    )
app_name = "core"

urlpatterns = [
    path("", index, name="index"),
    #product
    path("products/", product_list_view, name="product-list"),
    path("product/<pid>", product_detail_view, name="product-detail"),

    #category
    path("category/", category_list_view, name="category-list"),
    path("category/<cid>/", category_product_list_view, name="category-product-list"),
    #vendor
    path("vendor/", vendor_list_view, name="vendor-list"),
    path("vendor/<vid>", vendor_detail_view, name="vendor-detail"),
    
    #Tags
    path("products/tag/<slug:tag_slug>", tag_list, name="tags"),

    #review
    path("ajax-add-review/<int:pid>/", ajax_add_review , name="ajax-add-review"),
    # Search
    path("search/", search_view, name="search"),
    #
    path("filter-products/", filter_product, name="filter-product"),
    #Add to cart
    path("add-to-cart/", add_to_cart, name="add-to-cart"),
    
    #Cart page
    path("cart/", cart_view, name="cart"),
    
    #delete product from cart
    path("delete-from-cart/", delete_item_from_cart, name="delete-from-cart"),

    #update product from cart
    path("update-cart/", update_cart, name="update-cart"),
    
    #check out
    path("checkout/", checkout_view, name="checkout"),
    
    #paypal
    path('paypal/', include('paypal.standard.ipn.urls')),

    #paypal completed
    path('payment-completed/',payment_completed_view, name="payment-completed"),
    
    #paypal faile
    path('payment-failed/', payment_failed_view, name="payment-failed"),
]