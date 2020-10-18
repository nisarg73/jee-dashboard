from django.shortcuts import render
from api.models import Item
from api.serializers import ItemSerializer
from rest_framework import viewsets
from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

# Create your views here.

class ItemViewSet(viewsets.ModelViewSet):
	"""
	This viewset automatically provides 'list', 'create',
	'retrieve', 'update' and 'destroy' actions.
	"""

	queryset = Item.objects.all()
	serializer_class = ItemSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = {
		'year': ['exact'],
		'round_no': ['exact'],
		'institute_type': ['exact'],
		'quota': ['exact'],
		'pool': ['exact'],
		'institute_short': ['exact'],
		'program_name': ['exact'],
		'program_duration': ['exact'],
		'degree_short': ['exact'],
		'category': ['exact'],
		'opening_rank': ['lte', 'gte'],
		'closing_rank': ['lte', 'gte'],
		'is_preparatory': ['exact']
	}
	search_fields = ['pool', 'institute_short', 'program_name', 'program_duration', 'degree_short', 'category', 'opening_rank', 'closing_rank']
	ordering_fields = ['pool', 'institute_short', 'program_name', 'program_duration', 'degree_short', 'category', 'opening_rank', 'closing_rank']
