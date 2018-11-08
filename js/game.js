// JavaScript Document
(function () {
	var lat, lon;

	$(document).ready(function () {

		navigator.geolocation.getCurrentPosition(CurrentPosition);

	});

	function CurrentPosition(location) {
		var lat = location.coords.latitude;
		var lon = location.coords.longitude;
		getWeather(lat, lon);

	}
	var api = "https://fcc-weather-api.glitch.me/api/current?";

	function getWeather(lat, lon) {
		console.log(lat, lon);
		var urlString = api + "lat=" + lat + "&" + "lon=" + lon;
		console.log(urlString);
		$.ajax({
			url: urlString,
			success: function (result) {
				console.log(result);
				var fahrenheit = Math.round((result.main.temp - 273.15) * 9 / 5 + 32);
								var temp = Math.round(result.main.temp - 273.15);
								$('.weather_report > .temp_to_fahrenheit').html(fahrenheit + "&#8457;");

								$('.temp_to_fahrenheit').click(function () {
									if ($('.weather_report > .temp_to_fahrenheit').html().indexOf("℉") != -1) {
										$('.temp_to_fahrenheit').html(temp + "&#8451;");
									} else {
										$('.temp_to_fahrenheit').html(fahrenheit + "&#8457;");
									}
								});
				                $('ul.weather_info > li.location').html(result.name);
								$('ul.weather_info > li.sky_status').html(result.weather[0].description);
								$('ul.weather_info > li.wind').html(result.wind.speed + "m/s");
								$('.weather_report > img').attr({
									'src': result.weather[0].icon,
									'alt': result.weather[0].description
								});
							

			}
		});
	}
})();
