# Generated by Django 3.2.8 on 2021-11-19 21:00

import api.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('name', models.CharField(default='None', max_length=60)),
                ('image_url', models.URLField(max_length=100)),
                ('image_height', models.IntegerField()),
                ('image_width', models.IntegerField()),
                ('popularity', models.IntegerField()),
                ('URI', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Bracket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bracket_name', models.CharField(max_length=75)),
                ('size', models.IntegerField()),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('created', models.DateField(auto_now_add=True)),
                ('image_url', models.URLField(max_length=100)),
                ('type', models.CharField(default='single_elim', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('name', models.CharField(max_length=60, primary_key=True, serialize=False)),
                ('image_url', models.URLField(max_length=100)),
                ('bracket_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.bracket')),
            ],
        ),
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('image_url', models.URLField(max_length=100)),
                ('image_height', models.IntegerField()),
                ('image_width', models.IntegerField()),
                ('playlist_name', models.CharField(max_length=100)),
                ('owner_display_name', models.CharField(max_length=60)),
                ('URI', models.CharField(max_length=100)),
                ('total_tracks', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('popularity', models.IntegerField()),
                ('URI', models.CharField(max_length=100)),
                ('URL', models.URLField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Match',
            fields=[
                ('match_id', models.AutoField(primary_key=True, serialize=False)),
                ('code', models.CharField(default=api.models.generate_code, max_length=8, unique=True)),
                ('host', models.CharField(default=None, max_length=50, unique=True)),
                ('round', models.IntegerField()),
                ('status', models.CharField(max_length=20)),
                ('bracket_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.bracket')),
                ('item_a', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='+', to='api.item')),
                ('item_b', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='+', to='api.item')),
                ('winner', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='+', to='api.item')),
            ],
        ),
        migrations.CreateModel(
            name='CreatedBy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=50, unique=True)),
                ('bracket_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.bracket')),
            ],
        ),
        migrations.CreateModel(
            name='BelongsTo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('playlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.playlist')),
                ('track_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.track')),
            ],
        ),
    ]