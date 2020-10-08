from rest_framework import serializers
from api.models import Item

class ItemSerializer(serializers.ModelSerializer):
	"""
	Serializer for the Item model
	"""

	class Meta:
		"""
		Meta class for ItemSerializer
		"""

		model = Item
		exclude = ['round_no', 'quota', 'institute_full', 'institute_location', 'degree_full']