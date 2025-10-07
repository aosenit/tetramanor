# Rental Page Components

This directory contains all components for the rental property listing page, inspired by Nigeria Property Centre but styled with Tetramanor's brand colors.

## Main Components

### `RentalListing.tsx`
The main listing component that includes:
- Advanced search functionality
- Filter integration (sidebar + quick filters)
- Sorting options (Recent, Name A-Z, Name Z-A)
- Grid/List view toggle
- Mobile-responsive filter modal
- Results count and summary

**Features:**
- Client-side filtering by apartment type, location, and amenities
- Real-time search with URL parameter sync
- Sticky filter sidebar on desktop
- Mobile-friendly slide-out filter panel

### `FilterSidebar.tsx`
Advanced filter panel with:
- Property type selection (Studio, 1-5+ bedrooms)
- Location dropdown
- Price range (Min/Max)
- Furnishing status
- Multiple amenity checkboxes
- Active filter count badge
- Clear all filters button

**Colors Used:**
- Primary: `#116114` (Green)
- Accent: `#CD6115` (Orange)
- Background: `#FAFAFA`

### `QuickFilters.tsx`
Quick access filter buttons for:
- Property types (with icons)
- Furnishing status

**Features:**
- One-click filtering
- Visual active state
- Responsive layout

### `RentalPropertyCard.tsx`
Property card component supporting both grid and list views:

**Grid View:**
- Property image with hover zoom effect
- Category and availability badges
- Photo count indicator
- Property name and location
- Apartment type badge
- Amenity preview (up to 3)
- "View Details" button

**List View:**
- Horizontal layout on desktop
- More amenities shown (up to 4)
- Better for detailed browsing

### `PropertyStats.tsx` (Optional)
Statistics component showing:
- Total properties count
- Property type breakdown table
- Quick stats cards

**Usage:**
```tsx
import PropertyStats from "./components/PropertyStats";

// Inside RentalListing component, after fetching data:
<PropertyStats rentals={rentals} />
```

### `RentalFAQ.tsx` (Optional)
Accordion-style FAQ component with:
- Common rental questions
- Expandable answers
- Smooth animations

**Usage:**
```tsx
import RentalFAQ from "./components/RentalFAQ";

// Add to rental page:
<RentalFAQ />
```

### `Hero.tsx`
Hero section with:
- Background image
- Gradient overlay
- Animated heading and subtitle
- Responsive sizing

## Color Scheme

The components use Tetramanor's brand colors:

- **Primary Green**: `#116114` - Used for CTAs, active states, highlights
- **Accent Orange**: `#CD6115` - Used for location icons, secondary elements
- **Background**: `#FAFAFA` - Page background
- **Success Green**: `#E8F5E8` - Background for green elements
- **White**: `#FFFFFF` - Cards and containers

## Responsive Breakpoints

- **Mobile**: < 768px - Single column, mobile filter modal
- **Tablet**: 768px - 1024px - Two column grid
- **Desktop**: > 1024px - Sidebar + three column grid

## Future Enhancements

Potential additions:
- Pagination for large result sets
- Price filtering (currently in UI but not connected)
- Saved properties/favorites
- Property comparison feature
- Map view integration
- Share property functionality

