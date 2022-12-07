from django.http import HttpResponse
import json
import requests

def index(request):
    # Get calendar data
    calendar_url = 'https://www.calendarapi.com/api/events?date=2021-01-01'
    calendar_data = requests.get(calendar_url).json()

    # Get weather data
    weather_url = 'https://www.weatherapi.com/api/forecast?location=New York'
    weather_data = requests.get(weather_url).json()

    # Get news data
    news_url = 'https://www.newsapi.com/v2/top-headlines?country=us'
    news_data = requests.get(news_url).json()

    # Return response
    response = {
        'calendar': calendar_data,
        'weather': weather_data,
        'news': news_data
    }
    return HttpResponse(json.dumps(response))
