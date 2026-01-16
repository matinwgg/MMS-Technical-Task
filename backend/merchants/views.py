from rest_framework import viewsets
from .models import Merchant
from .serializers import MerchantSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.permissions import IsAuthenticated

class MerchantViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticated]
    queryset = Merchant.objects.all().order_by('-created_at')
    serializer_class = MerchantSerializer


    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        merchant = self.get_object()
        status = request.data.get("status")

        if status not in ["ACTIVE", "PENDING", "SUSPENDED"]:
            return Response({"error": "Invalid status"}, status=400)

        merchant.status = status
        merchant.save()
        return Response({"status": merchant.status})


@api_view(['GET'])
def health_check(request):
    return Response({"status": "ok"})

@api_view(['GET'])
def merchant_list(request):
    return Response({"message": "Merchant endpoint works"})
