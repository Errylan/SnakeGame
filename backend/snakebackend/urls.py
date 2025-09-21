from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Snake API rodando 🎮</h1><p>Use <a href='/api/scores/'>/api/scores/</a> para acessar a API.</p>")

urlpatterns = [
    path('', home),  # rota inicial
    path('admin/', admin.site.urls),
    path('api/', include('scores.urls')),
]
