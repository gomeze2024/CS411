from django.shortcuts import render
import requests

def get_weather():
    query = requests.args.get('Boston') #after the get i just put boston as an example but i am not sure how to make to like current location
    api_key = '537275397b9037ad50e8da9814692add'
    response = requests.get("https://openweathermap.org/api", headers ={"Authorization": api_key})

    output = []
    for weather in responses.json()['weather']:
        output.append(weather['src']['original'])
    
    print (output)


def get_news():
    query = requests.args.get('News') #same thing here dont know hwo to get current news
    api_key = 'pub_13171ec2935c971700ae44d5ab454b14e2bf3'
    response = requests.get("https://newsdata.io/search-news", headers ={"Authorization": api_key})

    output = []
    for news in responses.json()['news']:
        output.append(weather['src']['original'])
    
    print (output)


#google calendar api was not popping up for me so if u find one just put in the quotes i left blank
def get_calendar():
    query = requests.args.get('Day') #same shit here 
    api_key = ''
    response = requests.get("", headers ={"Authorization": api_key})

    output = []
    for day in responses.json()['day']:
        output.append(weather['src']['original'])
    
    print (output)
