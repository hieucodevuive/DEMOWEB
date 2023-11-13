# Generated by Django 4.2.7 on 2023-11-13 02:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_alter_productreview_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productreview',
            name='rating',
            field=models.IntegerField(choices=[(20, '★☆☆☆☆'), (40, '★★☆☆☆'), (60, '★★★☆☆'), (80, '★★★★☆'), (100, '★★★★★')], default=None),
        ),
    ]
