from django.urls import path

from django.urls import path

from . import views

urlpatterns = [
    path('', views.protectedViews.login, name="start"),
    path('home', views.protectedViews.home, name="home"),
    path('<int:pk>/', views.protectedViews.RoomDetailView.as_view(), name="room_detail"),
    path('<pk>/delete-room', views.protectedViews.DeleteRoom, name="delete_room"),
    path('create-room', views.protectedViews.CreateRoom, name="create_room"),
    path('<pk>/send-message', views.protectedViews.SendMessage, name="send_message"),
    path('create-user', views.protectedViews.CreateUser, name="create_user"),
    path('register-user', views.protectedViews.register, name="register_user"),
    path('login', views.protectedViews.login_user, name="login"),
    path('logout', views.protectedViews.logout_user, name='logout'),
]