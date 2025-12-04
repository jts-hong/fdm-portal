# Deployment Configuration

## How it works

The app uses an environment variable `BASE_PATH` to configure the base path for deployment.

### Development (Local)
- **No prefix needed**
- Run: `npm run dev`
- Access at: `http://localhost:8080`
- Logo loads from: `/fdm-logo.png`

### Production Build (with /fdm-portal prefix)
- **For GitHub Pages or subdirectory deployment**
- Build: `BASE_PATH=/fdm-portal npm run build`
- The app will be built with `/fdm-portal` prefix
- All routes and assets will use the prefix

## Configuration

The `next.config.ts` reads the `BASE_PATH` environment variable:

```typescript
const basePath = process.env.BASE_PATH || '';
```

- If `BASE_PATH` is not set → no prefix (development)
- If `BASE_PATH=/fdm-portal` → all routes prefixed with `/fdm-portal`

## Build Commands

```bash
# Development (no prefix)
npm run dev

# Production build without prefix
npm run build

# Production build with /fdm-portal prefix
BASE_PATH=/fdm-portal npm run build
```

## Logo File Location

The logo should be placed at:
```
public/fdm-logo.png
```

It will be accessible at:
- Development: `http://localhost:8080/fdm-logo.png`
- Production (with prefix): `https://your-domain.com/fdm-portal/fdm-logo.png`
