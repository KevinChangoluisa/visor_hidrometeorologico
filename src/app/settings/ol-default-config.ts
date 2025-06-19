// settings/ol-default-config.ts
export const DEFAULT_OL_CONFIG = {
  center: [-78.4678, -0.1807], // Quito (EPSG:4326)
  zoom: 5,
  maxZoom: 18,
  minZoom: 3,
  projection: 'EPSG:3857',
  extent4326: [-98, -6.5, -71.7, 3.5],
};

export const DEFAULT_OL_STYLE = {
  // 🔵 Tamaño del círculo
  circleMinRadius: 6,
  circleMaxRadius: 12,
  circleZoomFactor: 1.2,

  // 🎨 Color del borde del círculo (plomo)
  circleStrokeColor: '#666666', // gris plomo
  // 🔤 Fuente y estilos
  fontFamily: 'sans-serif',
  fontWeight: '',

  // 🆎 Texto dentro del círculo (categoría: M, H, HM)
  internalTextColor: 'black',
  internalTextOutline: 'transparent',
  internalTextOutlineWidth: 0,

  // 🏷️ Texto externo (debajo del círculo, código INAMHI)
  externalTextColor: 'black',
  externalTextOutline: 'white',
  externalTextOutlineWidth: 2,
  textOffsetY: 4,

  // 🎨 Colores por estado
  circleColors: {
    mantenimiento: '#FFA500', // naranja
    transmitiendo: '#00AA00', // verde
    noTransmite: '#FF0000', // rojo
    porDefecto: '#808080', // gris
  },

  // Zoom a partir del cual mostrar el código INAMHI
  zoomShowLabel: 8,
};
