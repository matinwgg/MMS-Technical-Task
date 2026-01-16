# merchants/models.py
from django.db import models

class Merchant(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ACTIVE', 'Active'),
        ('SUSPENDED', 'Suspended'),
    ]

    name = models.CharField(max_length=255)
    business_registration_number = models.CharField(
        max_length=100,
        unique=True
    )
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    merchant = models.ForeignKey(
        Merchant, related_name="transactions",
        on_delete=models.CASCADE
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(
        max_length=10,
        choices=[("IN", "Income"), ("OUT", "Expense")]
    )
    created_at = models.DateTimeField(auto_now_add=True)
