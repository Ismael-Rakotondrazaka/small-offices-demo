import Papa from 'papaparse';
import { describe, expect, it } from 'vitest';

describe('OfficeBulkCreateForm CSV Parsing', () => {
  it('should parse CSV data correctly with papaparse', () => {
    const csvData = `title,type,arr,posts,price,lat,lng,isFake
Bureau Moderne Paris 1,PRIVATE_OFFICE,1,4,1200,48.8566,2.3522,false
Espace Collaboratif Marais,OPEN_SPACE,3,12,800,48.8606,2.3376,false`;

    const result = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      trim: true,
      trimHeaders: true,
    });

    expect(result.errors).toHaveLength(0);
    expect(result.data).toHaveLength(2);
    expect(result.data[0]).toEqual({
      arr: '1',
      isFake: 'false',
      lat: '48.8566',
      lng: '2.3522',
      photoUrls: '',
      posts: '4',
      price: '1200',
      serviceIds: '',
      title: 'Bureau Moderne Paris 1',
      type: 'PRIVATE_OFFICE',
    });
  });

  it('should handle CSV parsing errors', () => {
    const invalidCsvData = `title,type,arr,posts,price,lat,lng,isFake
Bureau Moderne Paris 1,PRIVATE_OFFICE,1,4,1200,48.8566,2.3522,false
"Bureau with "quotes" in title",OPEN_SPACE,3,12,800,48.8606,2.3376,false`;

    const result = Papa.parse(invalidCsvData, {
      header: true,
      skipEmptyLines: true,
      trim: true,
      trimHeaders: true,
    });

    expect(result.errors.length).toBeGreaterThan(0);
  });
});
