# Generated by Django 5.0.9 on 2024-10-18 01:40

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Friends',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state', models.CharField(choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('declined', 'Declined')], default='pending', max_length=10)),
                ('application_date', models.DateTimeField(auto_now_add=True)),
                ('acceptance_date', models.DateTimeField(blank=True, null=True)),
                ('rejection_date', models.DateTimeField(blank=True, null=True)),
                ('id_user1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friends_set1', to=settings.AUTH_USER_MODEL)),
                ('id_user2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friends_set2', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddConstraint(
            model_name='friends',
            constraint=models.UniqueConstraint(fields=('id_user1', 'id_user2'), name='unique_friendship'),
        ),
    ]
