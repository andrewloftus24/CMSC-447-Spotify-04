# Generated by Django 3.2.8 on 2021-11-19 21:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('brackets', '0004_auto_20211119_1554'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Artist',
        ),
        migrations.RemoveField(
            model_name='createdby',
            name='bracket_id',
        ),
        migrations.RemoveField(
            model_name='item',
            name='bracket_id',
        ),
        migrations.RemoveField(
            model_name='match',
            name='bracket_id',
        ),
        migrations.RemoveField(
            model_name='match',
            name='item_a',
        ),
        migrations.RemoveField(
            model_name='match',
            name='item_b',
        ),
        migrations.RemoveField(
            model_name='match',
            name='winner',
        ),
        migrations.DeleteModel(
            name='BelongsTo',
        ),
        migrations.DeleteModel(
            name='Bracket',
        ),
        migrations.DeleteModel(
            name='CreatedBy',
        ),
        migrations.DeleteModel(
            name='Item',
        ),
        migrations.DeleteModel(
            name='Match',
        ),
        migrations.DeleteModel(
            name='Playlist',
        ),
        migrations.DeleteModel(
            name='Track',
        ),
    ]
