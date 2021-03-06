# Generated by Django 3.1.4 on 2021-01-04 20:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_levels_parent'),
    ]

    operations = [
        migrations.AddField(
            model_name='word',
            name='parent_level',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.levels'),
        ),
        migrations.AlterField(
            model_name='word',
            name='parent_group',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.wordgroup'),
        ),
    ]
