from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="geoapiExercises")
location = geolocator.reverse("-22.866776, -43.554714", timeout=10)
print(location.address)

#API KEY GOOGLE = AIzaSyCZl6PZumDZvsemyhavkItc7DoEhYOu72A
