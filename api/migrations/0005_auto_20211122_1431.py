# Generated by Django 3.2.8 on 2021-11-22 19:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20211120_1706'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lobby',
            name='id',
        ),
        migrations.AlterField(
            model_name='lobby',
            name='host',
            field=models.CharField(default=None, max_length=50, primary_key=True, serialize=False, unique=True),
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=None, max_length=50, unique=True)),
                ('host', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.lobby')),
            ],
        ),
    ]
