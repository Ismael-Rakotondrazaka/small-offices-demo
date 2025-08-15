import * as turf from '@turf/turf';

import arrondissements from './arrondissements.json';

const arrondissementMap = new Map();
arrondissements.features.forEach((feature) => {
  arrondissementMap.set(feature.properties.c_ar, feature);
});

export const findArrondissementByCoordinates = (lat: number, lng: number): null | number => {
  const point = turf.point([lng, lat]);
  for (const [arrondissementNumber, feature] of arrondissementMap) {
    if (turf.booleanPointInPolygon(point, feature.geometry)) {
      return arrondissementNumber;
    }
  }

  return null;
};
