import requests
from django.shortcuts import render

# Function to handle the request to the OpenWeatherMap API
def get_weather(zip_code):
    api_key = "537275397b9037ad50e8da9814692add"
    # URL for the OpenWeatherMap API
    url = "http://api.openweathermap.org/data/2.5/weather?zip={}&units=imperial&appid={}".format(zip_code, api_key)
    # Send the request and get the response
    response = requests.get(url)
    # Return the temperature in Fahrenheit
    return response.json()['main']['temp']

# View function to handle the request and render the response
def weather_view(request):
    zip_code = request.GET.get('zip')
    temperature = get_weather(zip_code)
    return render(request, 'weather.html', {'temperature': temperature, 'zip_code': zip_code})
