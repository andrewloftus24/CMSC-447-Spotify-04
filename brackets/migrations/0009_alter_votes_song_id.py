# Generated by Django 3.2.8 on 2021-12-08 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('brackets', '0008_auto_20211206_1918'),
    ]

    operations = [
        migrations.AlterField(
            model_name='votes',
            name='song_id',
            field=models.CharField(max_length=100),
        ),
    ]
