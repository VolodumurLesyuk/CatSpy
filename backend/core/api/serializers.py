from rest_framework import serializers
from core.models import SpyCat, Mission, Target


class SpyCatSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpyCat
        fields = '__all__'


class TargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Target
        exclude = ['mission']

    def validate(self, data):
        if self.instance:
            if self.instance.is_completed or self.instance.mission.is_completed:
                if "notes" in data and data["notes"] != self.instance.notes:
                    raise serializers.ValidationError("Cannot update notes of a completed target or mission.")
        return data


class MissionSerializer(serializers.ModelSerializer):
    targets = TargetSerializer(many=True)

    class Meta:
        model = Mission
        fields = ['id', 'cat', 'is_completed', 'targets']

    def create(self, validated_data):
        targets_data = validated_data.pop('targets')
        mission = Mission.objects.create(**validated_data)
        for target_data in targets_data:
            Target.objects.create(mission=mission, **target_data)
        return mission


class AssignCatSerializer(serializers.Serializer):
    cat_id = serializers.IntegerField()

    def validate_cat_id(self, value):
        if not SpyCat.objects.filter(id=value).exists():
            raise serializers.ValidationError("Cat not found.")
        return value