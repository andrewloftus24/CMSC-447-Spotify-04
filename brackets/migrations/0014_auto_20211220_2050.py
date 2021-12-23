# Generated by Django 3.2.8 on 2021-12-21 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('brackets', '0013_auto_20211208_2148'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='track',
            name='URI',
        ),
        migrations.RemoveField(
            model_name='track',
            name='URL',
        ),
        migrations.RemoveField(
            model_name='track',
            name='name',
        ),
        migrations.RemoveField(
            model_name='track',
            name='popularity',
        ),
        migrations.AddField(
            model_name='track',
            name='room_code',
            field=models.CharField(default='ABCDEF', max_length=6, unique=True),
        ),
        migrations.AddField(
            model_name='track',
            name='song_name',
            field=models.CharField(default=None, max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='track',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]