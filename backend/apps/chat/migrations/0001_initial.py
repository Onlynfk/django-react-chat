# Generated by Django 3.2.5 on 2024-01-08 03:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Room",
            fields=[
                ("room_id", models.AutoField(primary_key=True, serialize=False)),
                ("created", models.DateTimeField(auto_now_add=True)),
                (
                    "reciever",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="reciever",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "sender",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="sender", to=settings.AUTH_USER_MODEL
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Chat",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("text", models.CharField(max_length=300)),
                ("date", models.DateTimeField(auto_now_add=True)),
                ("has_seen", models.BooleanField(default=False)),
                (
                    "reciever",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="reciever_msg",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "room_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="chats", to="chat.room"
                    ),
                ),
                (
                    "sender",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sender_msg",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
