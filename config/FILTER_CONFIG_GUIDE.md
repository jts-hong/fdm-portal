# Filter Configuration Guide

This document explains how to manage filters in the FDM Portal landing page using the centralized configuration system.

## Overview

All filter configurations are centralized in `/config/filterConfig.ts`. This single file controls:
- Which filters appear on the landing page
- The order filters are displayed
- Filter labels and behavior
- Filter dependencies (e.g., Team Tags depends on Reporting Domain)

## Configuration File Location

```
/config/filterConfig.ts
```

## How to Add a New Filter

### Step 1: Update the Data Model

Add your filter field to `types/report.ts`:

```typescript
export interface FilterState {
  // ... existing filters
  myNewFilter: string[];  // Add your new filter here
}
```

### Step 2: Add Data Source

Add the filter options to `data/config.json`:

```json
{
  "myNewFilterOptions": [
    "Option 1",
    "Option 2",
    "Option 3"
  ]
}
```

### Step 3: Add Filter Configuration

Add a new entry to the `FILTER_CONFIGS` array in `config/filterConfig.ts`:

```typescript
{
  id: 'myNewFilter',                    // Must match FilterState field name
  label: 'My New Filter',               // Display label in the sidebar
  configKey: 'myNewFilterOptions',      // Key in config.json
  reportField: 'myField',               // Field name in Report interface
  order: 7,                             // Display order (higher = later)
  isArrayField: false,                  // true if report field is an array
}
```

### Step 4: Update Report Interface (if needed)

If the filter references a new field in reports, add it to `types/report.ts`:

```typescript
export interface Report {
  // ... existing fields
  myField: string;  // Add your new report field
}
```

That's it! The filter will automatically appear in the sidebar and work with the filtering logic.

## How to Reorder Filters

Simply change the `order` property in `config/filterConfig.ts`:

```typescript
// Before: Team Tags appears second
{
  id: 'teamTags',
  order: 2,
  // ...
}

// After: Team Tags appears last
{
  id: 'teamTags',
  order: 10,
  // ...
}
```

## How to Add Filter Dependencies

Use the `dependsOn` property to make a filter depend on another:

```typescript
{
  id: 'teamTags',
  label: 'Team Tags',
  // ... other properties
  dependsOn: {
    filterId: 'reportingDomains',              // The filter this depends on
    helperText: '* Select a Reporting Domain to enable',  // Help text when disabled
  },
}
```

The dependent filter will be disabled until the parent filter has at least one selection.

## How to Remove a Filter

1. Remove or comment out the filter entry in `FILTER_CONFIGS` in `config/filterConfig.ts`
2. Optionally remove the field from `FilterState` in `types/report.ts`

## Configuration Properties Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier matching FilterState field name |
| `label` | string | Yes | Display label shown in the sidebar |
| `configKey` | string | Yes | Key in config.json for filter options |
| `reportField` | string | Yes | Field name in the Report interface |
| `order` | number | Yes | Display order (lower numbers appear first) |
| `isArrayField` | boolean | No | Set to true if the report field is an array (default: false) |
| `dependsOn` | object | No | Dependency configuration (see below) |

### Dependency Configuration

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `filterId` | string | Yes | ID of the filter this depends on |
| `helperText` | string | Yes | Text shown when dependency is not met |

## Current Filter Configuration

As of now, the filters are configured in this order:

1. **Reporting Domain** - Primary filter, no dependencies
2. **Team Tags** - Depends on Reporting Domain being selected
3. **Process Owner** - Independent filter
4. **Team** - Independent filter
5. **Report Category** - Independent filter
6. **Reporting Frequency** - Independent filter

## Examples

### Example 1: Array Field Filter

Team Tags is an example of an array field filter:

```typescript
{
  id: 'teamTags',
  label: 'Team Tags',
  configKey: 'teamTags',
  reportField: 'teamTags',
  order: 2,
  isArrayField: true,  // Report has teamTags: string[]
  dependsOn: {
    filterId: 'reportingDomains',
    helperText: '* Select a Reporting Domain to enable',
  },
}
```

### Example 2: Simple String Field Filter

Process Owner is a simple string field filter:

```typescript
{
  id: 'processOwners',
  label: 'Process Owner',
  configKey: 'processOwners',
  reportField: 'processOwner',
  order: 3,
  // No isArrayField needed (defaults to false)
  // No dependsOn needed (independent filter)
}
```

## Benefits of This Approach

✅ **Single source of truth** - All filter configuration in one file  
✅ **Easy to maintain** - Add, remove, or reorder filters without touching component code  
✅ **Type-safe** - TypeScript ensures configuration correctness  
✅ **Consistent behavior** - All filters work the same way automatically  
✅ **Clear dependencies** - Filter relationships are explicit and documented  

## Troubleshooting

**Filter not appearing?**
- Check that `id` matches a field in `FilterState`
- Verify `configKey` exists in `config.json`
- Ensure `order` is set correctly

**Filter not working correctly?**
- Verify `reportField` matches the actual field name in Report interface
- Check if `isArrayField` is set correctly for array fields
- Ensure data exists in both `config.json` and actual reports

**Dependency not working?**
- Verify `dependsOn.filterId` matches an existing filter's `id`
- Check that the parent filter is configured correctly
