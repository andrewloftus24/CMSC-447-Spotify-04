# Generated by Django 3.2.8 on 2021-11-04 14:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('brackets', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='brackets',
            old_name='image_url',
            new_name='song_name',
        ),
        migrations.RemoveField(
            model_name='brackets',
            name='text',
        ),
    ]
