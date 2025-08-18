import { describe, expect, it } from 'vitest';

import { findArrondissementByCoordinates } from '../../../shared/map/findArrondissementByCoordinates';

describe('findArrondissementByCoordinates', () => {
  it('should return correct arrondissement for coordinates in Paris', () => {
    const testCases = [
      { expected: 2, lat: 48.868279, lng: 2.342803 }, // 2ème arrondissement (Bourse)
      { expected: 8, lat: 48.872721, lng: 2.312554 }, // 8ème arrondissement (Élysée)
      { expected: 20, lat: 48.863461, lng: 2.401188 }, // 20ème arrondissement (Ménilmontant)
      { expected: 7, lat: 48.856174, lng: 2.312188 }, // 7ème arrondissement (Palais-Bourbon)
      { expected: 6, lat: 48.849130, lng: 2.332898 }, // 6ème arrondissement (Luxembourg)
      { expected: 15, lat: 48.840085, lng: 2.292826 }, // 15ème arrondissement (Vaugirard)
      { expected: 4, lat: 48.854341, lng: 2.357630 }, // 4ème arrondissement (Hôtel-de-Ville)
      { expected: 5, lat: 48.844443, lng: 2.350715 }, // 5ème arrondissement (Panthéon)
      { expected: 3, lat: 48.862872, lng: 2.360001 }, // 3ème arrondissement (Temple)
      { expected: 11, lat: 48.859059, lng: 2.380058 }, // 11ème arrondissement (Popincourt)
      { expected: 14, lat: 48.829245, lng: 2.326542 }, // 14ème arrondissement (Observatoire)
      { expected: 1, lat: 48.862563, lng: 2.336443 }, // 1er arrondissement (Louvre)
      { expected: 9, lat: 48.877164, lng: 2.337458 }, // 9ème arrondissement (Opéra)
      { expected: 16, lat: 48.860392, lng: 2.261971 }, // 16ème arrondissement (Passy)
      { expected: 19, lat: 48.880392, lng: 2.384821 }, // 19ème arrondissement (Buttes-Chaumont)
      { expected: 13, lat: 48.828388, lng: 2.362270 }, // 13ème arrondissement (Gobelins)
      { expected: 10, lat: 48.876000, lng: 2.360728 }, // 10ème arrondissement (Entrepôt)
      { expected: 18, lat: 48.886000, lng: 2.348161 }, // 18ème arrondissement (Buttes-Montmartre)
      { expected: 12, lat: 48.834974, lng: 2.421324 }, // 12ème arrondissement (Reuilly)
      { expected: 17, lat: 48.880392, lng: 2.306777 }, // 17ème arrondissement (Batignolles-Monceau)
    ];

    testCases.forEach(({ expected, lat, lng }) => {
      const result = findArrondissementByCoordinates(lat, lng);
      expect(result).toBe(expected);
    });
  });

  it('should return null for coordinates outside Paris', () => {
    const outsideParisCoordinates = [
      { lat: 48.800000, lng: 2.200000 }, // South of Paris
      { lat: 48.900000, lng: 2.200000 }, // North of Paris
      { lat: 48.850000, lng: 2.100000 }, // West of Paris
      { lat: 48.850000, lng: 2.500000 }, // East of Paris
      { lat: 43.296482, lng: 5.369780 }, // Marseille
      { lat: 45.764043, lng: 4.835659 }, // Lyon
      { lat: 43.604652, lng: 1.444209 }, // Toulouse
      { lat: 44.837789, lng: -0.57918 }, // Bordeaux
      { lat: 47.218371, lng: -1.553621 }, // Nantes
    ];

    outsideParisCoordinates.forEach(({ lat, lng }) => {
      const result = findArrondissementByCoordinates(lat, lng);
      expect(result).toBeNull();
    });
  });

  it('should handle edge cases and boundary coordinates', () => {
    const edgeCases = [
      { expected: 4, lat: 48.856614, lng: 2.352222 }, // Notre-Dame (4ème)
      { expected: 7, lat: 48.858370, lng: 2.294481 }, // Tour Eiffel (7ème)
      { expected: 1, lat: 48.860642, lng: 2.337644 }, // Louvre Museum (1er)
      { expected: 16, lat: 48.873781, lng: 2.295027 }, // Champs-Élysées (16ème)
      { expected: 18, lat: 48.886705, lng: 2.343104 }, // Sacré-Cœur (18ème)
    ];

    edgeCases.forEach(({ expected, lat, lng }) => {
      const result = findArrondissementByCoordinates(lat, lng);
      expect(result).toBe(expected);
    });
  });

  it('should handle coordinates at arrondissement boundaries', () => {
    const boundaryTests = [
      { expected: 2, lat: 48.868279, lng: 2.342803 }, // Center of 2ème
      { expected: 8, lat: 48.872721, lng: 2.312554 }, // Center of 8ème
      { expected: 20, lat: 48.863461, lng: 2.401188 }, // Center of 20ème
    ];

    boundaryTests.forEach(({ expected, lat, lng }) => {
      const result = findArrondissementByCoordinates(lat, lng);
      expect(result).toBe(expected);
    });
  });

  it('should handle invalid coordinates gracefully', () => {
    const invalidCoordinates = [
      { lat: 200, lng: 2.352222 }, // Invalid latitude
      { lat: 48.856614, lng: 200 }, // Invalid longitude
      { lat: -200, lng: 2.352222 }, // Invalid latitude
      { lat: 48.856614, lng: -200 }, // Invalid longitude
    ];

    invalidCoordinates.forEach(({ lat, lng }) => {
      const result = findArrondissementByCoordinates(lat, lng);
      expect(result).toBeNull();
    });
  });

  it('should handle extreme coordinate values', () => {
    const extremeCoordinates = [
      { lat: 90, lng: 180 }, // North Pole, International Date Line
      { lat: -90, lng: -180 }, // South Pole, International Date Line
      { lat: 0, lng: 0 }, // Null Island
      { lat: 48.856614, lng: 2.352222 }, // Valid Paris coordinates
    ];

    extremeCoordinates.forEach(({ lat, lng }) => {
      const result = findArrondissementByCoordinates(lat, lng);
      if (lat === 48.856614 && lng === 2.352222) {
        expect(result).toBe(4); // Should be in 4ème arrondissement
      }
      else {
        expect(result).toBeNull();
      }
    });
  });
});
