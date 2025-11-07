# Configuration File Guide

## Overview

The `config.json` file is a centralized location to manage all filterable entities in the FDM Data Solution Portal. This makes it easy to add, remove, or modify reporting domains, process owners, teams, and reporting frequencies without touching the code.

## File Location

`data/config.json`

## Structure

The config file contains four main arrays:

```json
{
  "reportingDomains": [...],
  "processOwners": [...],
  "teams": [...],
  "reportingFrequencies": [...]
}
```

## How It Works

1. **Predefined Options**: The config file defines all available options for each filter category
2. **Dynamic Merging**: The application automatically merges values from:
   - The config file (predefined options)
   - Actual reports in `reports.json` (values used in reports)
3. **Filter Display**: All merged values appear in the filter sidebar, sorted alphabetically

## Adding New Entities

### Adding a New Reporting Domain

1. Open `data/config.json`
2. Add the new domain to the `reportingDomains` array:
   ```json
   "reportingDomains": [
     "Business Continuity",
     "Access Control",
     "Your New Domain"
   ]
   ```
3. Save the file
4. The new domain will appear in the filter sidebar automatically

### Adding a New Process Owner

1. Open `data/config.json`
2. Add the new owner to the `processOwners` array with their contact information:
   ```json
   "processOwners": [
     {
       "name": "John Smith",
       "email": "john.smith@fdm.com",
       "eid": "E12345",
       "team": "BCM Team"
     },
     {
       "name": "New Owner Name",
       "email": "new.owner@fdm.com",
       "eid": "E12399",
       "team": "Your Team Name"
     }
   ]
   ```
3. Each owner must have:
   - `name`: Full name of the process owner
   - `email`: Contact email address
   - `eid`: Employee ID number
   - `team`: Team they belong to (must match a team in the `teams` array)
4. Save the file
5. The new owner will appear in the filter sidebar automatically

### Adding a New Team

1. Open `data/config.json`
2. Add the new team to the `teams` array:
   ```json
   "teams": [
     "FDM Core Team",
     "BCM Team",
     "Your New Team"
   ]
   ```
3. Save the file
4. The new team will appear in the filter sidebar automatically

### Adding a New Reporting Frequency

1. Open `data/config.json`
2. Add the new frequency to the `reportingFrequencies` array:
   ```json
   "reportingFrequencies": [
     "Daily",
     "Weekly",
     "Bi-Weekly"
   ]
   ```
3. Save the file
4. The new frequency will appear in the filter sidebar automatically

## Using Entities in Reports

When adding a new report to `reports.json`, you can use any value from the config file, or add a new value. If you use a value not in the config file, it will automatically appear in the filters.

### Example Report Entry

```json
{
  "id": "my-new-report",
  "name": "My New Report",
  "reportingDomain": "Business Continuity",  // Must match config or be a new value
  "processOwner": "John Smith",              // Must match a name in processOwners config
  "team": "BCM Team",                        // Must match config or be a new value
  "reportingFrequency": "Daily",             // Must match config or be a new value
  "shortDescription": "Brief description...",
  "detailedDescription": "Full description...",
  "sourceTables": ["Table1", "Table2"],     // Array of source table names
  "destinationLink": "https://portal.company.com/report",  // Link to the actual report
  "accessNeeded": "Portal Access, Role X",  // Required access/permissions
  "lastUpdated": "2024-11-03"
}
```

## Best Practices

1. **Keep Config Updated**: Add new entities to the config file before using them in reports
2. **Consistent Naming**: Use consistent capitalization and spelling across all entities
3. **Remove Unused**: Periodically review and remove unused entities from the config file
4. **Sort Alphabetically**: Keep arrays sorted alphabetically for easier management (optional, the app sorts them automatically)

## Notes

- The config file serves as a "master list" but the application will also include any values found in actual reports
- This ensures backward compatibility - existing reports will continue to work even if their values aren't in the config file
- Filter options are automatically sorted alphabetically in the UI
- Changes to the config file take effect immediately after saving (no code changes needed)

