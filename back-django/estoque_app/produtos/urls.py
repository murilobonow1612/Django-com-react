from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProdutoViewSet

router = DefaultRouter()
router.register(r'produtos', ProdutoViewSet)

urlpatterns = [
    #url usada no get do productList.js e no post do addproductform.js
    path('api/produtos/', include(router.urls)),
]