from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema

from core.models import SpyCat, Mission
from core.api.serializers import AssignCatSerializer, SpyCatSerializer, MissionSerializer

class SpyCatViewSet(viewsets.ModelViewSet):
    queryset = SpyCat.objects.all()
    serializer_class = SpyCatSerializer


class MissionViewSet(viewsets.ModelViewSet):
    queryset = Mission.objects.all()
    serializer_class = MissionSerializer

    def destroy(self, request, *args, **kwargs):
        mission = self.get_object()
        if mission.cat:
            return Response({"error": "Cannot delete a mission assigned to a cat."},
                            status=status.HTTP_400_BAD_REQUEST)
        return super().destroy(request, *args, **kwargs)

    @extend_schema(
        request=AssignCatSerializer,
        responses={200: None, 400: dict, 404: dict}
    )
    @action(detail=True, methods=['post'])
    def assign_cat(self, request, pk=None):
        serializer = AssignCatSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        mission = self.get_object()
        cat_id = serializer.validated_data["cat_id"]
        cat = SpyCat.objects.get(id=cat_id)

        mission.cat = cat
        mission.save()

        return Response({"status": "cat assigned"})