# Bulk Office Creation

This feature allows administrators to create multiple offices at once by uploading a CSV file.

## Features

- **CSV Upload**: Upload CSV files with office data
- **Client-side Parsing**: Uses papaparse library for client-side CSV parsing
- **Data Validation**: Validates office data before creation
- **Bulk Creation**: Creates up to 100 offices in a single request
- **Error Handling**: Shows detailed error messages for failed creations
- **Progress Tracking**: Displays success/failure counts and specific errors

## CSV Format

The CSV file should contain the following columns:

| Column   | Type    | Required | Description                                                         |
| -------- | ------- | -------- | ------------------------------------------------------------------- |
| `title`  | string  | Yes      | Office title                                                        |
| `type`   | string  | Yes      | Office type: `INDEPENDENT_SPACE`, `OPEN_SPACE`, or `PRIVATE_OFFICE` |
| `arr`    | number  | Yes      | Arrondissement number (1-20)                                        |
| `posts`  | number  | Yes      | Number of workstations                                              |
| `price`  | number  | Yes      | Monthly price in euros                                              |
| `lat`    | number  | Yes      | Latitude coordinate                                                 |
| `lng`    | number  | Yes      | Longitude coordinate                                                |
| `isFake` | boolean | No       | Fake office flag (default: false)                                   |

## Example CSV

```csv
title,type,arr,posts,price,lat,lng,isFake,serviceIds,photoUrls
Bureau Moderne Paris 1,PRIVATE_OFFICE,1,4,1200,48.8566,2.3522,false,,
Espace Collaboratif Marais,OPEN_SPACE,3,12,800,48.8606,2.3376,false,,
Studio Indépendant Montmartre,INDEPENDENT_SPACE,18,2,600,48.8867,2.3431,false,,
```

## Usage

1. Navigate to the admin offices page (`/admin/offices`)
2. Click the "Création en Masse" button
3. Upload a CSV file with office data
4. Review the parsed data in the preview table
5. Click "Create X Offices" to create all offices
6. Review the results showing success/failure counts

## API Endpoint

- **POST** `/api/offices/bulk`
- **Body**: `{ offices: StoreOfficeRequestBody[] }`
- **Response**: 
  ```typescript
  {
    data: OfficeDTO[];
    created: number;
    failed: number;
    errors: { index: number; error: string }[];
  }
  ```

## Limitations

- Maximum 100 offices per CSV file
- Photos and services are optional (not included in bulk creation as requested)
- Each office gets a unique slug generated automatically
- Authentication required (admin only)

## Error Handling

The system provides detailed error reporting:
- Shows which rows failed to create
- Displays specific error messages for each failure
- Continues processing even if some offices fail
- Reports success and failure counts separately 