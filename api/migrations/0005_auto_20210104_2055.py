# Generated by Django 3.1.4 on 2021-01-04 20:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210104_2016'),
    ]

    operations = [
        migrations.AlterField(
            model_name='word',
            name='translation',
            field=models.CharField(default='N/A', max_length=200),
        ),
    ]
