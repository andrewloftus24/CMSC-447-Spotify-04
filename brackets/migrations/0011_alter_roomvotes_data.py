# Generated by Django 3.2.8 on 2021-12-09 02:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('brackets', '0010_auto_20211208_2114'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roomvotes',
            name='data',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='brackets.votes'),
        ),
    ]