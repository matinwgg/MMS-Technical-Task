from django.test import TestCase

# merchants/tests.py
from rest_framework.test import APITestCase

class MerchantTests(APITestCase):
    def test_create_merchant(self):
        data = {
            "name": "Test Ltd",
            "business_registration_number": "BRN-001",
            "email": "test@test.com",
            "phone": "0240000000"
        }
        response = self.client.post("/api/merchants/", data)
        self.assertEqual(response.status_code, 201)
