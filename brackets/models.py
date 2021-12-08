from django.db import models

# Create your models here.


class Brackets(models.Model):
    bracket_name = models.CharField(max_length=75, default='None')
    size = models.IntegerField()
    last_modified = models.DateTimeField(auto_now=True)  # sets to current date every time it's saved
    created = models.DateField(auto_now_add=True)  # automatically sets to current date when bracket created
    image_url = models.URLField(max_length=100)
    type = models.CharField(max_length=20, default='single_elim')
    created_by = models.CharField(max_length=20, default='None')  # user who created the bracket


class Item(models.Model):
    name = models.CharField(max_length=60, primary_key=True)
    bracket_id = models.ForeignKey('Brackets', on_delete=models.CASCADE)
    image_url = models.URLField(max_length=100)


class Match(models.Model):
    match_id = models.AutoField(primary_key=True)
    round = models.IntegerField()
    status = models.CharField(max_length=20)  # created, in_progress, completed
    bracket_id = models.ForeignKey('Brackets', on_delete=models.CASCADE)
    item_a = models.ForeignKey('Item', on_delete=models.RESTRICT, related_name='+')
    item_b = models.ForeignKey('Item', on_delete=models.RESTRICT, related_name='+')
    winner = models.ForeignKey('Item', on_delete=models.RESTRICT, related_name='+')


class Artist(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=60, default='None', unique=True)
    image_url = models.URLField(max_length=100)
    image_height = models.IntegerField()
    image_width = models.IntegerField()
    popularity = models.IntegerField()


class Playlist(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    image_url = models.URLField(max_length=100)
    image_height = models.IntegerField()
    image_width = models.IntegerField()
    playlist_name = models.CharField(max_length=100)
    owner_display_name = models.CharField(max_length=60)
    total_tracks = models.IntegerField()


class BelongsTo(models.Model):
    playlist = models.ForeignKey('Playlist', on_delete=models.CASCADE)
    track_id = models.ForeignKey('Track', on_delete=models.CASCADE)


class Track(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    popularity = models.IntegerField()
    artist_name = models.CharField(max_length=30, default='None')
    album_type = models.CharField(max_length=15, default='None')
    album_name = models.CharField(max_length=50, default='None')
