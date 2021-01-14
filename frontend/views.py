from django.shortcuts import render
from api.models import Word, Levels, WordGroup
from django.contrib.auth.decorators import login_required
import json
import random
from django.contrib.auth import authenticate
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect

from .forms import RegisterForm

# how to use.. default view
def info(request):
    return render(request, 'frontend/info.html')

# 
def modify(request):

    if request.user.is_authenticated:

        if request.method == 'POST':

            G_ID = request.POST.get('num')
            G_CSV = request.POST.get('csv')
            G_CSV = G_CSV.split(',')

            for item in G_CSV:

                new_word = Word(parent_level_id=int(G_ID), translation=item.strip())
                new_word.save()

            return redirect('/')

        else:

            default_groups = Levels.objects.all()

            context2 = {}
            for level in default_groups:
                context2[level.name] = level.id

            return render(request, 'frontend/modadd.html', {'groups': context2})

    else:

        return render(request, 'frontend/modify.html')

# personalized and customized training
def training(request):

    #  if request.user.is_authenticated:

        if request.method == 'POST':

            formDict = request.POST.dict()
            groups_to_include = []
            training_length = request.POST.get('wordamm')

            # get list of group id's to gather words form
            for item in formDict:
                if item != 'csrfmiddlewaretoken' and item != 'wordamm':
                    if formDict[item] == 'on':
                        groups_to_include.append(item)

            # get list of words to train from specified groups
            word_pool = {}
            for group in groups_to_include:
                # group to add
                if group[0] == 'G':
                    tmp_word_pool = Word.objects.filter(parent_group=int(group[1:]))

                    for item in tmp_word_pool:
                        word_pool[item.translation] = item.stroke

                # level to add
                elif group[0] == 'L':
                    tmp_word_pool = Word.objects.filter(parent_level=int(group[1:]))

                    for item in tmp_word_pool:
                        word_pool[item.translation] = item.stroke


            # randomize order of words
            keys = list(word_pool.keys())
            random.shuffle(keys)

            if not keys:

                #  all_groups = WordGroup.objects.filter(parent=request.user)
                default_groups = Levels.objects.all()

                #  context = {}
                #  for group in all_groups:
                #      context[group.name] = group.id

                context2 = {}
                for level in default_groups:
                    context2[level.name] = level.id

                return render(request, 'frontend/groups.html', {
                    #  'group_list': context,
                    'levels_list': context2,
                    'MSG': 'Please select a word group',
                })

            # correct length of words
            try:
                keys = keys[:int(training_length)]
            except:
                keys = keys[:30]

            # format words/translations and strokes for frontend
            final_word_list = ''
            #  final_word_dict = {}

            for key in keys:
                final_word_list += key.lower() + ' '
                #  final_word_dict[key] = word_pool[key]

            return render(request, 'frontend/train.html', {
                'word_list': final_word_list,
                #  'word_dict': final_word_dict
            })

        else:
            return redirect('/')

        #  else:
        #      return redirect('/auth/login')

# home and selection of training
def groups(request):

    #  if request.user.is_authenticated:

        #  all_groups = WordGroup.objects.filter(parent=request.user)
        default_groups = Levels.objects.all()

        #  context = {}
        #  for group in all_groups:
        #      if not group.trash:
        #          context[group.name] = group.id

        context2 = {}
        for level in default_groups:
            context2[level.name] = level.id

        #  return render(request, 'frontend/groups.html', {'group_list': context, 'levels_list': context2})
        return render(request, 'frontend/groups.html', {'levels_list': context2})
    #  else:
    #      return render(request, 'frontend/index.html')

# signup
#  def signup(request):
#      if request.method == 'POST':
#          form = RegisterForm(request.POST)
#          if form.is_valid():
#              form.save()

#              username = form.cleaned_data.get('username')
#              raw_password = form.cleaned_data.get('password1')

#              user = authenticate(username=username, password=raw_password)

#              if user is not None:
#                  login(request, user)
#                  return redirect('/')
#          return render(request, 'registration/signup.html', {'form': form})
#      else:
#          #  form = UserCreationForm()
#          form = RegisterForm()
#          return render(request, 'registration/signup.html', {'form': form})

