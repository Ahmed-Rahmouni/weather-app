import { weatherFields } from '@/data/weatherFields';
export type WeatherUnits = 'metric' | 'imperial';
type NullableNumber = number | null;
export type WeatherLocation = [number, number];

export type WeatherOptions = {
  location: WeatherLocation; // [lat, lon] pair
  units: WeatherUnits;
  fields: typeof weatherFields;
  timesteps: ['1d', '1h'];
  startTime: 'now';
  endTime: 'nowPlus5d';
  timezone: 'auto';
};

// Weather values
export type WeatherForecastHourlyValues = {
  cloudBase: NullableNumber;
  cloudCeiling: NullableNumber;
  cloudCover: number;
  dewPoint: number;
  evapotranspiration: number;
  freezingRainIntensity: number;
  humidity: number;
  iceAccumulation: number;
  iceAccumulationLwe: number;
  precipitationProbability: number;
  pressureSurfaceLevel: number;
  rainAccumulation: number;
  rainAccumulationLwe: number;
  rainIntensity: number;
  sleetAccumulation: number;
  sleetAccumulationLwe: number;
  sleetIntensity: number;
  snowAccumulation: number;
  snowAccumulationLwe: number;
  snowDepth: number;
  snowIntensity: number;
  temperature: number;
  temperatureApparent: number;
  uvHealthConcern: number;
  uvIndex: number;
  visibility: number;
  weatherCode: number;
  windDirection: NullableNumber;
  windGust: number;
  windSpeed: number;
};

export type WeatherForecastDailyValues = {
  cloudBaseAvg: number;
  cloudBaseMax: number;
  cloudBaseMin: number;
  cloudCeilingAvg: number;
  cloudCeilingMax: number;
  cloudCeilingMin: number;
  cloudCoverAvg: number;
  cloudCoverMax: number;
  cloudCoverMin: number;
  dewPointAvg: number;
  dewPointMax: number;
  dewPointMin: number;
  evapotranspirationAvg: number;
  evapotranspirationMax: number;
  evapotranspirationMin: number;
  evapotranspirationSum: number;
  freezingRainIntensityAvg: number;
  freezingRainIntensityMax: number;
  freezingRainIntensityMin: number;
  humidityAvg: number;
  humidityMax: number;
  humidityMin: number;
  iceAccumulationAvg: number;
  iceAccumulationLweAvg: number;
  iceAccumulationLweMax: number;
  iceAccumulationLweMin: number;
  iceAccumulationLweSum: number;
  iceAccumulationMax: number;
  iceAccumulationMin: number;
  iceAccumulationSum: number;
  moonriseTime: string | null; // ISO 8601 string
  moonsetTime: string | null; // ISO 8601 string
  precipitationProbabilityAvg: number;
  precipitationProbabilityMax: number;
  precipitationProbabilityMin: number;
  pressureSurfaceLevelAvg: number;
  pressureSurfaceLevelMax: number;
  pressureSurfaceLevelMin: number;
  rainAccumulationAvg: number;
  rainAccumulationLweAvg: number;
  rainAccumulationLweMax: number;
  rainAccumulationLweMin: number;
  rainAccumulationMax: number;
  rainAccumulationMin: number;
  rainAccumulationSum: number;
  rainIntensityAvg: number;
  rainIntensityMax: number;
  rainIntensityMin: number;
  sleetAccumulationAvg: number;
  sleetAccumulationLweAvg: number;
  sleetAccumulationLweMax: number;
  sleetAccumulationLweMin: number;
  sleetAccumulationLweSum: number;
  sleetAccumulationMax: number;
  sleetAccumulationMin: number;
  sleetIntensityAvg: number;
  sleetIntensityMax: number;
  sleetIntensityMin: number;
  snowAccumulationAvg: number;
  snowAccumulationLweAvg: number;
  snowAccumulationLweMax: number;
  snowAccumulationLweMin: number;
  snowAccumulationLweSum: number;
  snowAccumulationMax: number;
  snowAccumulationMin: number;
  snowAccumulationSum: number;
  snowDepthAvg: number;
  snowDepthMax: number;
  snowDepthMin: number;
  snowDepthSum: number;
  snowIntensityAvg: number;
  snowIntensityMax: number;
  snowIntensityMin: number;
  sunriseTime: string; // ISO 8601 string
  sunsetTime: string; // ISO 8601 string
  temperatureApparentAvg: number;
  temperatureApparentMax: number;
  temperatureApparentMin: number;
  temperatureAvg: number;
  temperatureMax: number;
  temperatureMin: number;
  uvHealthConcernAvg: number;
  uvHealthConcernMax: number;
  uvHealthConcernMin: number;
  uvIndexAvg: number;
  uvIndexMax: number;
  uvIndexMin: number;
  visibilityAvg: number;
  visibilityMax: number;
  visibilityMin: number;
  weatherCodeMax: number;
  weatherCodeMin: number;
  windDirectionAvg: number;
  windGustAvg: number;
  windGustMax: number;
  windGustMin: number;
  windSpeedAvg: number;
  windSpeedMax: number;
  windSpeedMin: number;
  weatherCodeFullDay: number;
  weatherCodeDay: number;
  weatherCodeNight: number;
};

// Weather intervals
export type WeatherForecastHourlyIntervals = {
  startTime: string; // ISO 8601 string
  values: WeatherForecastHourlyValues;
};

export type WeatherForecastDailyIntervals = {
  startTime: string; // ISO 8601 string
  values: WeatherForecastDailyValues;
};

// Timelines
export type WeatherForecastHourlyTimeline = {
  timestep: '1h'; // Fixed type for hourly
  endTime: string; // ISO 8601 string
  startTime: string; // ISO 8601 string
  intervals: WeatherForecastHourlyIntervals[]; // Only hourly intervals
};

export type WeatherForecastDailyTimeline = {
  timestep: '1d'; // Fixed type for daily
  endTime: string; // ISO 8601 string
  startTime: string; // ISO 8601 string
  intervals: WeatherForecastDailyIntervals[]; // Only daily intervals
};

// Hard error type
export type HardErrorResponse = {
  code: number; // e.g., 404001 for Not Found
  type: string; // e.g., "Not Found"
  message: string; // e.g., "The insight associated with the request could not be found"
};

// Soft error (warnings) type
export type Warning = {
  code: number; // e.g., 246001
  type: string; // e.g., "Time Bounded Field"
  message: string; // e.g., "The following field is not supported for a time range"
  meta: {
    field: string;
    from: string;
    to: string;
  };
};

// Weather response structure
export type WeatherResponse = {
  data?: {
    timelines: [WeatherForecastDailyTimeline, WeatherForecastHourlyTimeline];
    warnings?: Warning[]; // Optional warnings for the entire response
  };
  hardError?: HardErrorResponse; // For hard errors
};
