from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404
from core.admin import ProductAdmin
from core.models import Product, Category, Vendor, CartOrder, CartOrderItems, ProductImages, ProductReview, wishlist, Address
from django.db.models import Count ,Avg
from taggit.models import Tag
from core.forms import ProductReviewForm
def index(request):
    # products = Product.objects.all().order_by("-id")
    products = Product.objects.filter(product_status = "published", featured=True)
    
    context = {
        "products":products
    }
    return render(request, 'core/index.html', context)


def product_list_view(request):
    products = Product.objects.filter(product_status = "published")
    
    context = {
        "products":products
    }
    return render(request, 'core/product-list.html', context)


def category_list_view(request):
    categories = Category.objects.all()
    
    context = {
        "categories":categories
    }
    return render(request, 'core/category-list.html', context)

def category_product_list_view(request, cid):
    category = Category.objects.get(cid=cid)
    products = Product.objects.filter(product_status="published", category=category)
    
    context = {
        "category":category,
        "products":products,
    }
    return render(request, "core/category-product-list.html", context)

def vendor_list_view(request):
    vendors = Vendor.objects.all()
    context = {
        "vendors": vendors,
    }
    return render(request, "core/vendor-list.html", context)

def vendor_detail_view(request, vid):
    vendor = Vendor.objects.get(vid=vid)
    products = Product.objects.filter(vendor=vendor, product_status="published")
    context = {
        "vendor": vendor,
        "products": products,
    }
    return render(request, "core/vendor-detail-list.html", context)

def product_detail_view(request, pid):
    product = Product.objects.get(pid=pid)
    products = Product.objects.filter(category=product.category).exclude(pid=pid)
    p_image = product.p_images.all()
    
    reviews = ProductReview.objects.filter(product=product).order_by("-date")
    
    average_rating = ProductReview.objects.filter(product=product).aggregate(rating=Avg('rating'))
    
    review_form = ProductReviewForm()
    # p_image = product.p_images.all()
    
    context ={
        "p": product,
        "p_image": p_image,
        "review_form": review_form,
        "reviews": reviews,
        "average_rating": average_rating,
        "products": products,


    }
    
    return render(request, "core/product-detail.html", context)

def tag_list(request, tag_slug=None):
    products = Product.objects.filter(product_status="published").order_by("-id")
    
    tag = None
    if tag_slug:
        tag = get_object_or_404(Tag, slug=tag_slug)
        products = products.filter(tags__in=[tag])
        
    context = {
        "products": products,
        "tag": tag,
    }
    return render(request, "core/tag.html", context)

def ajax_add_review(request, pid):
    product = Product.objects.get(pk=pid)
    user = request.user
    
    review = ProductReview.objects.create(
        user=user, 
        product=product,
        review = request.POST['review'],
        rating = request.POST['rating'],
    )
    
    context = {
        'user': user.username,
        'review': request.POST['review'],
        'rating': request.POST['rating'],

    }
    
    average_reviews = ProductReview.objects.filter(product=product).aaggregate(rating=Avg("rating"))
    
    return JsonResponse(
      {  
        'bool': True,
        'context': context,
        'average_reviews': average_reviews, 
      }
    )
    
def search_view(request):
    query = request.GET.get("q")
    
    products = Product.objects.filter(title__icontains=query).order_by("-date")
    
    context = {
        "products": products,
        "query": query,
    }
    return render(request, "core/search.html", context)