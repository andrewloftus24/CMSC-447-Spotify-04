# Generated by Django 3.2.8 on 2021-12-07 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('brackets', '0007_votes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='votes',
            name='song_name',
        ),
        migrations.AddField(
            model_name='votes',
            name='song_id',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
