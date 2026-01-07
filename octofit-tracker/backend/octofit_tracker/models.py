from djongo import models

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    team = models.CharField(max_length=100, blank=True, null=True)
    profile_pic = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    members = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

class Activity(models.Model):
    user = models.CharField(max_length=150)
    type = models.CharField(max_length=50)
    duration = models.IntegerField()  # minutes
    calories = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(max_length=50)
    suggested_for = models.JSONField(default=list)

class Leaderboard(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)
