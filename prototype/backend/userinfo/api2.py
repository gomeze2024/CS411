import requests
from django.shortcuts import render
import json

def set_comment(condition):
  if (condition == "Thunderstorm"):
    comment = "If you have to go outside, make sure to stay away from tall objects."
  elif (condition == "Drizzle"):
    comment = "Pitter patter. Pitter patter."
  elif (condition == "Snow"):
    comment = "Woah it's snowing. I love fresh snow"
  elif (condition == "Clouds"):
    comment = "Just another cloudy day."
  elif (condition == "Clear"):
    comment = "The weather's clear. Make sure to gets lots done!"
  else:
    comment = "Woah. Stay safe out there"
  return comment

# Function to handle the request to the OpenWeatherMap API
def get_weather(zip_code):
    api_key = "537275397b9037ad50e8da9814692add"
    # URL for the OpenWeatherMap API
    url = "http://api.openweathermap.org/data/2.5/weather?zip={}&units=imperial&appid={}".format(zip_code, api_key)
    # Send the request and get the response
    response = requests.get(url)
    condition = response.json()['weather'][0]['main']
    comment = set_comment(condition)

    weather_data = {
        "location": response.json()['name'],
        "temperature": response.json()['main']['temp'],
        "description": response.json()['weather'][0]['description'],
        "high": response.json()['main']['temp_max'],
        "low": response.json()['main']['temp_min'],
        "comment": comment
    }
    # Return the temperature in Fahrenheit
    return json.dumps(weather_data)

# View function to handle the request and render the response
def weather_view(request):
    zip_code = request.GET.get('zip')
    temperature = get_weather(zip_code)
    return render(request, 'weather.html', {'temperature': temperature, 'zip_code': zip_code})

print(get_weather("10462"))