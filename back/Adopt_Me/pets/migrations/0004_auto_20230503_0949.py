# Generated by Django 3.2.18 on 2023-05-03 09:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pets', '0003_delete_donation'),
    ]

    operations = [
        migrations.CreateModel(
            name='learnmore',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('info', models.TextField()),
            ],
        ),
        migrations.RemoveField(
            model_name='type_of_animals',
            name='breed',
        ),
        migrations.DeleteModel(
            name='adoption',
        ),
        migrations.DeleteModel(
            name='type_of_animals',
        ),
    ]
