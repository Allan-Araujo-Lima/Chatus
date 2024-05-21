from django.shortcuts import render
from .models import Message, Room
from django.contrib.auth.models import User
from django.views.generic.detail import DetailView
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
import json
from .password import *

class protectedViews():
    @login_required
    def home(request):
        rooms = Room.objects.all().order_by('-created_at')
        return render(request, 'chat/home.html', {
            'rooms': rooms,
        })
        
    def login(request):
        return render(request, 'chat/login.html')

    def register(request):
        return render(request, 'chat/register-user.html')

    class RoomDetailView(DetailView):
        model = Room
        template_name = 'chat/list-messages.html'

        def get_context_data(self, **kwargs):
            context = super().get_context_data(**kwargs)
            return context
        
    @csrf_exempt
    def CreateRoom(request):
        data = json.loads(request.body)
        room = Room.objects.create(user=request.user, title=data['title'],)
        return render(request, 'chat/room.html', {
            'room': room,
        })
    
    def SendMessage(request, pk):
        data = json.loads(request.body)
        room = Room.objects.get(id=pk)
        message = Message.objects.create(user=request.user, text=data['text'],)
        room.messages.add(message)
        return HttpResponse(status=204)

    def DeleteRoom(request, pk):
        Room.objects.get(id=pk).delete()
        return HttpResponse(status=200)

    @csrf_exempt
    def CreateUser(request):
        data = json.loads(request.body)
        password = make_password(data['password'])
        user = User.objects.create(first_name=data['first_name'], last_name=data['last_name'], username=data['first_name'] + data['last_name'], email=data['email'], password=password).save()
        return HttpResponse(status=201)

    @csrf_protect
    def login_user(request):
        data = json.loads(request.body)
        data_save = User.objects.get(email=data['email'])
        user = authenticate(request, username=data_save.username, password=data['password'])
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            print("a")
            return HttpResponseBadRequest(402)
        
    def logout_user(request):
        logout(request)
        return redirect('/')
        
    