from django.contrib.auth.models import User, Group
from rest_framework import serializers

from api.models import Word, Levels, WordGroup

class WordGroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WordGroup
        fields = '__all__'

class LevelsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Levels
        fields = '__all__'

class WordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Word
        fields = '__all__'


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
