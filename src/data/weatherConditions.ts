type WeatherConditionDaily = {
  description: string;
  img: string;
};

type WeatherConditionHourly = {
  description: string;
  img: { small: string; big: string };
  nightImg?: { small: string; big: string };
};

export const weatherCodeMapHourly: { [key: string]: WeatherConditionHourly }[] =
  [
    {
      '1000': {
        description: 'Clear',
        img: {
          small: '10000_clear_small.png',
          big: '10000_clear_small@2x.png',
        },
        nightImg: {
          small: '10001_clear_small.png',
          big: '10001_clear_small@2x.png',
        },
      },
    },
    {
      '1100': {
        description: 'Mostly Clear',
        img: {
          small: '11000_mostly_clear_small.png',
          big: '11000_mostly_clear_small@2x.png',
        },
        nightImg: {
          small: '11001_mostly_clear_small.png',
          big: '11001_mostly_clear_small@2x.png',
        },
      },
    },
    {
      '1101': {
        description: 'Partly Cloudy',
        img: {
          small: '11010_partly_cloudy_small.png',
          big: '11010_partly_cloudy_small@2x.png',
        },
        nightImg: {
          small: '11011_partly_cloudy_small.png',
          big: '11011_partly_cloudy_small@2x.png',
        },
      },
    },
    {
      '1102': {
        description: 'Mostly Cloudy',
        img: {
          small: '11020_mostly_cloudy_small.png',
          big: '11020_mostly_cloudy_small@2x.png',
        },
        nightImg: {
          small: '11021_mostly_cloudy_small.png',
          big: '11021_mostly_cloudy_small@2x.png',
        },
      },
    },
    {
      '1001': {
        description: 'Cloudy',
        img: {
          small: '10010_cloudy_small.png',
          big: '10010_cloudy_small@2x.png',
        },
      },
    },
    {
      '2000': {
        description: 'Fog',
        img: { small: '20000_fog_small.png', big: '20000_fog_small@2x.png' },
      },
    },
    {
      '2100': {
        description: 'Light Fog',
        img: {
          small: '21000_fog_light_small.png',
          big: '21000_fog_light_small@2x.png',
        },
      },
    },
    {
      '4000': {
        description: 'Drizzle',
        img: {
          small: '40000_drizzle_small.png',
          big: '40000_drizzle_small@2x.png',
        },
      },
    },
    {
      '4001': {
        description: 'Rain',
        img: { small: '40010_rain_small.png', big: '40010_rain_small@2x.png' },
      },
    },
    {
      '4200': {
        description: 'Light Rain',
        img: {
          small: '42000_rain_light_small.png',
          big: '42000_rain_light_small@2x.png',
        },
      },
    },
    {
      '4201': {
        description: 'Heavy Rain',
        img: {
          small: '42010_rain_heavy_small.png',
          big: '42010_rain_heavy_small@2x.png',
        },
      },
    },
    {
      '5000': {
        description: 'Snow',
        img: { small: '50000_snow_small.png', big: '50000_snow_small@2x.png' },
      },
    },
    {
      '5001': {
        description: 'Flurries',
        img: {
          small: '50010_flurries_small.png',
          big: '50010_flurries_small@2x.png',
        },
      },
    },
    {
      '5100': {
        description: 'Light Snow',
        img: {
          small: '51000_snow_light_small.png',
          big: '51000_snow_light_small@2x.png',
        },
      },
    },
    {
      '5101': {
        description: 'Heavy Snow',
        img: {
          small: '51010_snow_heavy_small.png',
          big: '51010_snow_heavy_small@2x.png',
        },
      },
    },
    {
      '6000': {
        description: 'Freezing Drizzle',
        img: {
          small: '60000_freezing_rain_drizzle_small.png',
          big: '60000_freezing_rain_drizzle_small@2x.png',
        },
      },
    },
    {
      '6001': {
        description: 'Freezing Rain',
        img: {
          small: '60010_freezing_rain_small.png',
          big: '60010_freezing_rain_small@2x.png',
        },
      },
    },
    {
      '6200': {
        description: 'Light Freezing Rain',
        img: {
          small: '62000_freezing_rain_light_small.png',
          big: '62000_freezing_rain_light_small@2x.png',
        },
      },
    },
    {
      '6201': {
        description: 'Heavy Freezing Rain',
        img: {
          small: '62010_freezing_rain_heavy_small.png',
          big: '62010_freezing_rain_heavy_small@2x.png',
        },
      },
    },
    {
      '7000': {
        description: 'Ice Pellets',
        img: {
          small: '70000_ice_pellets_small.png',
          big: '70000_ice_pellets_small@2x.png',
        },
      },
    },
    {
      '7101': {
        description: 'Heavy Ice Pellets',
        img: {
          small: '71010_ice_pellets_heavy_small.png',
          big: '71010_ice_pellets_heavy_small@2x.png',
        },
      },
    },
    {
      '7102': {
        description: 'Light Ice Pellets',
        img: {
          small: '71020_ice_pellets_light_small.png',
          big: '71020_ice_pellets_light_small@2x.png',
        },
      },
    },
    {
      '8000': {
        description: 'Thunderstorm',
        img: {
          small: '80000_tstorm_small.png',
          big: '80000_tstorm_small@2x.png',
        },
      },
    },
  ];

export const weatherCodeMapDaily: { [key: string]: WeatherConditionDaily }[] = [
  { '10000': { description: 'Clear', img: '10000_clear_small.png' } },
  { '10001': { description: 'Clear', img: '10001_clear_small.png' } },
  { '10010': { description: 'Cloudy', img: '10010_cloudy_small.png' } },
  {
    '11000': {
      description: 'Mostly Clear',
      img: '11000_mostly_clear_small.png',
    },
  },
  {
    '11001': {
      description: 'Mostly Clear',
      img: '11001_mostly_clear_small.png',
    },
  },
  {
    '11010': {
      description: 'Partly Cloudy',
      img: '11010_partly_cloudy_small.png',
    },
  },
  {
    '11011': {
      description: 'Partly Cloudy',
      img: '11011_partly_cloudy_small.png',
    },
  },
  {
    '11020': {
      description: 'Mostly Cloudy',
      img: '11020_mostly_cloudy_small.png',
    },
  },
  {
    '11021': {
      description: 'Mostly Cloudy',
      img: '11021_mostly_cloudy_small.png',
    },
  },
  {
    '11030': {
      description: 'Mostly Clear',
      img: '11030_mostly_clear_small.png',
    },
  },
  {
    '11031': {
      description: 'Mostly Clear',
      img: '11031_mostly_clear_small.png',
    },
  },
  { '20000': { description: 'Fog', img: '20000_fog_small.png' } },
  { '21000': { description: 'Light Fog', img: '21000_fog_light_small.png' } },
  {
    '21010': {
      description: 'Light Fog, Mostly Clear',
      img: '21010_fog_light_mostly_clear_small.png',
    },
  },
  {
    '21011': {
      description: 'Light Fog, Mostly Clear',
      img: '21011_fog_light_mostly_clear_small.png',
    },
  },
  {
    '21020': {
      description: 'Light Fog, Partly Cloudy',
      img: '21020_fog_light_partly_cloudy_small.png',
    },
  },
  {
    '21021': {
      description: 'Light Fog, Partly Cloudy',
      img: '21021_fog_light_partly_cloudy_small.png',
    },
  },
  {
    '21030': {
      description: 'Light Fog, Mostly Cloudy',
      img: '21030_fog_light_mostly_cloudy_small.png',
    },
  },
  {
    '21031': {
      description: 'Light Fog, Mostly Cloudy',
      img: '21031_fog_light_mostly_cloudy_small.png',
    },
  },
  {
    '21060': {
      description: 'Fog, Mostly Clear',
      img: '21060_fog_mostly_clear_small.png',
    },
  },
  {
    '21061': {
      description: 'Fog, Mostly Clear',
      img: '21061_fog_mostly_clear_small.png',
    },
  },
  {
    '21070': {
      description: 'Fog, Partly Cloudy',
      img: '21070_fog_partly_cloudy_small.png',
    },
  },
  {
    '21071': {
      description: 'Fog, Partly Cloudy',
      img: '21071_fog_partly_cloudy_small.png',
    },
  },
  {
    '21080': {
      description: 'Fog, Mostly Cloudy',
      img: '21080_fog_mostly_cloudy_small.png',
    },
  },
  {
    '21081': {
      description: 'Fog, Mostly Cloudy',
      img: '21081_fog_mostly_cloudy_small.png',
    },
  },
  { '40000': { description: 'Drizzle', img: '40000_drizzle_small.png' } },
  { '40010': { description: 'Rain', img: '40010_rain_small.png' } },
  { '42000': { description: 'Light Rain', img: '42000_rain_light_small.png' } },
  { '42010': { description: 'Heavy Rain', img: '42010_rain_heavy_small.png' } },
  {
    '42020': {
      description: 'Heavy Rain, Partly Cloudy',
      img: '42020_rain_heavy_partly_cloudy_small.png',
    },
  },
  {
    '42021': {
      description: 'Heavy Rain, Partly Cloudy',
      img: '42021_rain_heavy_partly_cloudy_small.png',
    },
  },
  {
    '42030': {
      description: 'Drizzle, Mostly Clear',
      img: '42030_drizzle_mostly_clear_small.png',
    },
  },
  {
    '42031': {
      description: 'Drizzle, Mostly Clear',
      img: '42031_drizzle_mostly_clear_small.png',
    },
  },
  {
    '42040': {
      description: 'Drizzle, Partly Cloudy',
      img: '42040_drizzle_partly_cloudy_small.png',
    },
  },
  {
    '42041': {
      description: 'Drizzle, Partly Cloudy',
      img: '42041_drizzle_partly_cloudy_small.png',
    },
  },
  {
    '42050': {
      description: 'Drizzle, Mostly Cloudy',
      img: '42050_drizzle_mostly_cloudy_small.png',
    },
  },
  {
    '42051': {
      description: 'Drizzle, Mostly Cloudy',
      img: '42051_drizzle_mostly_cloudy_small.png',
    },
  },
  {
    '42080': {
      description: 'Rain, Partly Cloudy',
      img: '42080_rain_partly_cloudy_small.png',
    },
  },
  {
    '42081': {
      description: 'Rain, Partly Cloudy',
      img: '42081_rain_partly_cloudy_small.png',
    },
  },
  {
    '42090': {
      description: 'Rain, Mostly Clear',
      img: '42090_rain_mostly_clear_small.png',
    },
  },
  {
    '42091': {
      description: 'Rain, Mostly Clear',
      img: '42091_rain_mostly_clear_small.png',
    },
  },
  {
    '42100': {
      description: 'Rain, Mostly Cloudy',
      img: '42100_rain_mostly_cloudy_small.png',
    },
  },
  {
    '42101': {
      description: 'Rain, Mostly Cloudy',
      img: '42101_rain_mostly_cloudy_small.png',
    },
  },
  {
    '42110': {
      description: 'Heavy Rain, Mostly Clear',
      img: '42110_rain_heavy_mostly_clear_small.png',
    },
  },
  {
    '42111': {
      description: 'Heavy Rain, Mostly Clear',
      img: '42111_rain_heavy_mostly_clear_small.png',
    },
  },
  {
    '42120': {
      description: 'Heavy Rain, Mostly Cloudy',
      img: '42120_rain_heavy_mostly_cloudy_small.png',
    },
  },
  {
    '42121': {
      description: 'Heavy Rain, Mostly Cloudy',
      img: '42121_rain_heavy_mostly_cloudy_small.png',
    },
  },
  {
    '42130': {
      description: 'Light Rain, Mostly Clear',
      img: '42130_rain_light_mostly_clear_small.png',
    },
  },
  {
    '42131': {
      description: 'Light Rain, Mostly Clear',
      img: '42131_rain_light_mostly_clear_small.png',
    },
  },
  {
    '42140': {
      description: 'Light Rain, Partly Cloudy',
      img: '42140_rain_light_partly_cloudy_small.png',
    },
  },
  {
    '42141': {
      description: 'Light Rain, Partly Cloudy',
      img: '42141_rain_light_partly_cloudy_small.png',
    },
  },
  {
    '42150': {
      description: 'Light Rain, Mostly Cloudy',
      img: '42150_rain_light_mostly_cloudy_small.png',
    },
  },
  {
    '42151': {
      description: 'Light Rain, Mostly Cloudy',
      img: '42151_rain_light_mostly_cloudy_small.png',
    },
  },
  { '50000': { description: 'Snow', img: '50000_snow_small.png' } },
  { '50010': { description: 'Flurries', img: '50010_flurries_small.png' } },
  { '51000': { description: 'Light Snow', img: '51000_snow_light_small.png' } },
  { '51010': { description: 'Heavy Snow', img: '51010_snow_heavy_small.png' } },
  {
    '51020': {
      description: 'Light Snow, Mostly Clear',
      img: '51020_snow_light_mostly_clear_small.png',
    },
  },
  {
    '51021': {
      description: 'Light Snow, Mostly Clear',
      img: '51021_snow_light_mostly_clear_small.png',
    },
  },
  {
    '51030': {
      description: 'Light Snow, Partly Cloudy',
      img: '51030_snow_light_partly_cloudy_small.png',
    },
  },
  {
    '51031': {
      description: 'Light Snow, Partly Cloudy',
      img: '51031_snow_light_partly_cloudy_small.png',
    },
  },
  {
    '51040': {
      description: 'Light Snow, Mostly Cloudy',
      img: '51040_snow_light_mostly_cloudy_small.png',
    },
  },
  {
    '51041': {
      description: 'Light Snow, Mostly Cloudy',
      img: '51041_snow_light_mostly_cloudy_small.png',
    },
  },
  {
    '51050': {
      description: 'Snow, Mostly Clear',
      img: '51050_snow_mostly_clear_small.png',
    },
  },
  {
    '51051': {
      description: 'Snow, Mostly Clear',
      img: '51051_snow_mostly_clear_small.png',
    },
  },
  {
    '51060': {
      description: 'Snow, Partly Cloudy',
      img: '51060_snow_partly_cloudy_small.png',
    },
  },
  {
    '51061': {
      description: 'Snow, Partly Cloudy',
      img: '51061_snow_partly_cloudy_small.png',
    },
  },
  {
    '51070': {
      description: 'Snow, Mostly Cloudy',
      img: '51070_snow_mostly_cloudy_small.png',
    },
  },
  {
    '51071': {
      description: 'Snow, Mostly Cloudy',
      img: '51071_snow_mostly_cloudy_small.png',
    },
  },
  { '51080': { description: 'Wintry Mix', img: '51080_wintry_mix_small.png' } },
  { '51100': { description: 'Wintry Mix', img: '51100_wintry_mix_small.png' } },
  { '51120': { description: 'Wintry Mix', img: '51120_wintry_mix_small.png' } },
  { '51140': { description: 'Wintry Mix', img: '51140_wintry_mix_small.png' } },
  {
    '51150': {
      description: 'Flurries, Mostly Clear',
      img: '51150_flurries_mostly_clear_small.png',
    },
  },
  {
    '51151': {
      description: 'Flurries, Mostly Clear',
      img: '51151_flurries_mostly_clear_small.png',
    },
  },
  {
    '51160': {
      description: 'Flurries, Partly Cloudy',
      img: '51160_flurries_partly_cloudy_small.png',
    },
  },
  {
    '51161': {
      description: 'Flurries, Partly Cloudy',
      img: '51161_flurries_partly_cloudy_small.png',
    },
  },
  {
    '51170': {
      description: 'Flurries, Mostly Cloudy',
      img: '51170_flurries_mostly_cloudy_small.png',
    },
  },
  {
    '51171': {
      description: 'Flurries, Mostly Cloudy',
      img: '51171_flurries_mostly_cloudy_small.png',
    },
  },
  {
    '51190': {
      description: 'Heavy Snow, Mostly Clear',
      img: '51190_snow_heavy_mostly_clear_small.png',
    },
  },
  {
    '51191': {
      description: 'Heavy Snow, Mostly Clear',
      img: '51191_snow_heavy_mostly_clear_small.png',
    },
  },
  {
    '51200': {
      description: 'Heavy Snow, Partly Cloudy',
      img: '51200_snow_heavy_partly_cloudy_small.png',
    },
  },
  {
    '51201': {
      description: 'Heavy Snow, Partly Cloudy',
      img: '51201_snow_heavy_partly_cloudy_small.png',
    },
  },
  {
    '51210': {
      description: 'Heavy Snow, Mostly Cloudy',
      img: '51210_snow_heavy_mostly_cloudy_small.png',
    },
  },
  {
    '51211': {
      description: 'Heavy Snow, Mostly Cloudy',
      img: '51211_snow_heavy_mostly_cloudy_small.png',
    },
  },
  { '51220': { description: 'Wintry Mix', img: '51220_wintry_mix_small.png' } },
  {
    '60000': {
      description: 'Freezing Rain and Drizzle',
      img: '60000_freezing_rain_drizzle_small.png',
    },
  },
  {
    '60010': {
      description: 'Freezing Rain',
      img: '60010_freezing_rain_small.png',
    },
  },
  {
    '60020': {
      description: 'Freezing Rain and Drizzle, Partly Cloudy',
      img: '60020_freezing_rain_drizzle_partly_cloudy_small.png',
    },
  },
  {
    '60021': {
      description: 'Freezing Rain and Drizzle, Partly Cloudy',
      img: '60021_freezing_rain_drizzle_partly_cloudy_small.png',
    },
  },
  {
    '60030': {
      description: 'Freezing Rain and Drizzle, Mostly Clear',
      img: '60030_freezing_rain_drizzle_mostly_clear_small.png',
    },
  },
  {
    '60031': {
      description: 'Freezing Rain and Drizzle, Mostly Clear',
      img: '60031_freezing_rain_drizzle_mostly_clear_small.png',
    },
  },
  {
    '60040': {
      description: 'Freezing Rain and Drizzle, Mostly Cloudy',
      img: '60040_freezing_rain_drizzle_mostly_cloudy_small.png',
    },
  },
  {
    '60041': {
      description: 'Freezing Rain and Drizzle, Mostly Cloudy',
      img: '60041_freezing_rain_drizzle_mostly_cloudy_small.png',
    },
  },
  {
    '62000': {
      description: 'Light Freezing Rain',
      img: '62000_freezing_rain_light_small.png',
    },
  },
  {
    '62010': {
      description: 'Heavy Freezing Rain',
      img: '62010_freezing_rain_heavy_small.png',
    },
  },
  {
    '62020': {
      description: 'Heavy Freezing Rain, Partly Cloudy',
      img: '62020_freezing_rain_heavy_partly_cloudy_small.png',
    },
  },
  {
    '62021': {
      description: 'Heavy Freezing Rain, Partly Cloudy',
      img: '62021_freezing_rain_heavy_partly_cloudy_small.png',
    },
  },
  {
    '62030': {
      description: 'Light Freezing Rain, Partly Cloudy',
      img: '62030_freezing_rain_light_partly_cloudy_small.png',
    },
  },
  {
    '62031': {
      description: 'Light Freezing Rain, Partly Cloudy',
      img: '62031_freezing_rain_light_partly_cloudy_small.png',
    },
  },
  { '62040': { description: 'Wintry Mix', img: '62040_wintry_mix_small.png' } },
  {
    '62050': {
      description: 'Light Freezing Rain, Mostly Clear',
      img: '62050_freezing_rain_light_mostly_clear_small.png',
    },
  },
  {
    '62051': {
      description: 'Light Freezing Rain, Mostly Clear',
      img: '62051_freezing_rain_light_mostly_clear_small.png',
    },
  },
  { '62060': { description: 'Wintry Mix', img: '62060_wintry_mix_small.png' } },
  {
    '62070': {
      description: 'Heavy Freezing Rain, Mostly Clear',
      img: '62070_freezing_rain_heavy_mostly_clear_small.png',
    },
  },
  {
    '62071': {
      description: 'Heavy Freezing Rain, Mostly Clear',
      img: '62071_freezing_rain_heavy_mostly_clear_small.png',
    },
  },
  {
    '62080': {
      description: 'Heavy Freezing Rain, Mostly Cloudy',
      img: '62080_freezing_rain_heavy_mostly_cloudy_small.png',
    },
  },
  {
    '62081': {
      description: 'Heavy Freezing Rain, Mostly Cloudy',
      img: '62081_freezing_rain_heavy_mostly_cloudy_small.png',
    },
  },
  {
    '62090': {
      description: 'Light Freezing Rain, Mostly Cloudy',
      img: '62090_freezing_rain_light_mostly_cloudy_small.png',
    },
  },
  {
    '62091': {
      description: 'Light Freezing Rain, Mostly Cloudy',
      img: '62091_freezing_rain_light_mostly_cloudy_small.png',
    },
  },
  { '62120': { description: 'Wintry Mix', img: '62120_wintry_mix_small.png' } },
  {
    '62130': {
      description: 'Freezing Rain, Mostly Clear',
      img: '62130_freezing_rain_mostly_clear_small.png',
    },
  },
  {
    '62131': {
      description: 'Freezing Rain, Mostly Clear',
      img: '62131_freezing_rain_mostly_clear_small.png',
    },
  },
  {
    '62140': {
      description: 'Freezing Rain, Partly Cloudy',
      img: '62140_freezing_rain_partly_cloudy_small.png',
    },
  },
  {
    '62141': {
      description: 'Freezing Rain, Partly Cloudy',
      img: '62141_freezing_rain_partly_cloudy_small.png',
    },
  },
  {
    '62150': {
      description: 'Freezing Rain, Mostly Cloudy',
      img: '62150_freezing_rain_mostly_cloudy_small.png',
    },
  },
  {
    '62151': {
      description: 'Freezing Rain, Mostly Cloudy',
      img: '62151_freezing_rain_mostly_cloudy_small.png',
    },
  },
  { '62200': { description: 'Wintry Mix', img: '62200_wintry_mix_small.png' } },
  { '62220': { description: 'Wintry Mix', img: '62220_wintry_mix_small.png' } },
  {
    '70000': { description: 'Ice Pellets', img: '70000_ice_pellets_small.png' },
  },
  {
    '71010': {
      description: 'Heavy Ice Pellets',
      img: '71010_ice_pellets_heavy_small.png',
    },
  },
  {
    '71020': {
      description: 'Light Ice Pellets',
      img: '71020_ice_pellets_light_small.png',
    },
  },
  { '71030': { description: 'Wintry Mix', img: '71030_wintry_mix_small.png' } },
  { '71050': { description: 'Wintry Mix', img: '71050_wintry_mix_small.png' } },
  { '71060': { description: 'Wintry Mix', img: '71060_wintry_mix_small.png' } },
  {
    '71070': {
      description: 'Ice Pellets, Partly Cloudy',
      img: '71070_ice_pellets_partly_cloudy_small.png',
    },
  },
  {
    '71071': {
      description: 'Ice Pellets, Partly Cloudy',
      img: '71071_ice_pellets_partly_cloudy_small.png',
    },
  },
  {
    '71080': {
      description: 'Ice Pellets, Mostly Clear',
      img: '71080_ice_pellets_mostly_clear_small.png',
    },
  },
  {
    '71081': {
      description: 'Ice Pellets, Mostly Clear',
      img: '71081_ice_pellets_mostly_clear_small.png',
    },
  },
  {
    '71090': {
      description: 'Ice Pellets, Mostly Cloudy',
      img: '71090_ice_pellets_mostly_cloudy_small.png',
    },
  },
  {
    '71091': {
      description: 'Ice Pellets, Mostly Cloudy',
      img: '71091_ice_pellets_mostly_cloudy_small.png',
    },
  },
  {
    '71100': {
      description: 'Light Ice Pellets, Mostly Clear',
      img: '71100_ice_pellets_light_mostly_clear_small.png',
    },
  },
  {
    '71101': {
      description: 'Light Ice Pellets, Mostly Clear',
      img: '71101_ice_pellets_light_mostly_clear_small.png',
    },
  },
  {
    '71110': {
      description: 'Light Ice Pellets, Partly Cloudy',
      img: '71110_ice_pellets_light_partly_cloudy_small.png',
    },
  },
  {
    '71111': {
      description: 'Light Ice Pellets, Partly Cloudy',
      img: '71111_ice_pellets_light_partly_cloudy_small.png',
    },
  },
  {
    '71120': {
      description: 'Light Ice Pellets, Mostly Cloudy',
      img: '71120_ice_pellets_light_mostly_cloudy_small.png',
    },
  },
  {
    '71121': {
      description: 'Light Ice Pellets, Mostly Cloudy',
      img: '71121_ice_pellets_light_mostly_cloudy_small.png',
    },
  },
  {
    '71130': {
      description: 'Heavy Ice Pellets, Mostly Clear',
      img: '71130_ice_pellets_heavy_mostly_clear_small.png',
    },
  },
  {
    '71131': {
      description: 'Heavy Ice Pellets, Mostly Clear',
      img: '71131_ice_pellets_heavy_mostly_clear_small.png',
    },
  },
  {
    '71140': {
      description: 'Heavy Ice Pellets, Partly Cloudy',
      img: '71140_ice_pellets_heavy_partly_cloudy_small.png',
    },
  },
  {
    '71141': {
      description: 'Heavy Ice Pellets, Partly Cloudy',
      img: '71141_ice_pellets_heavy_partly_cloudy_small.png',
    },
  },
  { '71150': { description: 'Wintry Mix', img: '71150_wintry_mix_small.png' } },
  {
    '71160': {
      description: 'Heavy Ice Pellets, Mostly Cloudy',
      img: '71160_ice_pellets_heavy_mostly_cloudy_small.png',
    },
  },
  {
    '71161': {
      description: 'Heavy Ice Pellets, Mostly Cloudy',
      img: '71161_ice_pellets_heavy_mostly_cloudy_small.png',
    },
  },
  { '71170': { description: 'Wintry Mix', img: '71170_wintry_mix_small.png' } },
  { '80000': { description: 'Thunderstorm', img: '80000_tstorm_small.png' } },
  {
    '80010': {
      description: 'Thunderstorm, Mostly Clear',
      img: '80010_tstorm_mostly_clear_small.png',
    },
  },
  {
    '80011': {
      description: 'Thunderstorm, Mostly Clear',
      img: '80011_tstorm_mostly_clear_small.png',
    },
  },
  {
    '80020': {
      description: 'Thunderstorm, Mostly Cloudy',
      img: '80020_tstorm_mostly_cloudy_small.png',
    },
  },
  {
    '80021': {
      description: 'Thunderstorm, Mostly Cloudy',
      img: '80021_tstorm_mostly_cloudy_small.png',
    },
  },
  {
    '80030': {
      description: 'Thunderstorm, Partly Cloudy',
      img: '80030_tstorm_partly_cloudy_small.png',
    },
  },
  {
    '80031': {
      description: 'Thunderstorm, Partly Cloudy',
      img: '80031_tstorm_partly_cloudy_small.png',
    },
  },
];
