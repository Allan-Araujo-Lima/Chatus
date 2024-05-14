from django.urls import path

from . import views

urlpatterns = [
    path('', views.login, name="login"),
    path('home', views.home, name="home"),
    path('<int:pk>/', views.RoomDetailView.as_view(), name="room_detail"),
    path('<pk>/delete-room', views.DeleteRoom, name="delete_room"),
    path('create-room', views.CreateRoom, name="create_room"),
    path('<pk>/send-message', views.SendMessage, name="send_message"),
    path('create-user', views.CreateUser, name="create_user"),
    path('register-user', views.register, name="register_user"),
]