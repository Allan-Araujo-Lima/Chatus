from django.shortcuts import render
from .models import Message, Room
from django.views.generic.detail import DetailView
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Room

def home(request):
    rooms = Room.objects.all().order_by('-created_at')
    return render(request, 'chat/home.html', {
        'rooms': rooms,
    })

class RoomDetailView(DetailView):
    model = Room
    template_name = 'chat/list-messages.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        print("Contexo", context)
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
    print("essa é a room", room)
    message = Message.objects.create(user=request.user, text=data['text'],)
    room.messages.add(message)
    return HttpResponse(status=204)