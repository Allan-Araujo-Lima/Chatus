from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('<int:pk>/', views.RoomDetailView.as_view(), name="room_detail"),
    path('create-room', views.CreateRoom, name="create_room"),
]