from os import name
from django.urls import path
from core.views import ajax_add_review, category_list_view, category_product_list_view, index, product_detail_view, product_list_view, vendor_detail_view, vendor_list_view
app_name = "core"

urlpatterns = [
    #Trang Chủ
    path("", index, name="index"),
    path("products/", product_list_view, name="product-list"),
    path("product/<pid>", product_detail_view, name="product-detail"),

    #Loại Đồ Đùng
    path("category/", category_list_view, name="category-list"),
    path("category/<cid>/", category_product_list_view, name="category-product-list"),
    #Người Bán
    path("vendor/", vendor_list_view, name="vendor-list"),
    path("vendor/<vid>", vendor_detail_view, name="vendor-detail"),

    #review
    path("ajax-add-review/<int:pid>/", ajax_add_review , name="ajax-add-review")
]