# Generated by Django 5.0.4 on 2024-04-19 01:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_rename_messeges_room_messages_alter_message_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='messages',
            field=models.ManyToManyField(blank=True, to='chat.message'),
        ),
    ]
