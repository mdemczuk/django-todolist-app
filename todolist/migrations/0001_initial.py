# Generated by Django 4.0.4 on 2022-05-02 21:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.TextField(max_length=30)),
                ('last_name', models.TextField(max_length=50)),
                ('email', models.TextField(max_length=100)),
                ('mobile', models.TextField(max_length=12)),
                ('employment_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(max_length=400)),
                ('status', models.BooleanField()),
                ('category', models.IntegerField(choices=[('1', 'Category1'), ('2', 'Category2'), ('3', 'Category3'), ('4', 'Category4')])),
                ('due_date', models.DateField()),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todolist.employee')),
            ],
        ),
    ]
