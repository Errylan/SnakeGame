from rest_framework import viewsets
from .models import Score
from .serializers import ScoreSerializer

class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all().order_by('-points')
    serializer_class = ScoreSerializer
