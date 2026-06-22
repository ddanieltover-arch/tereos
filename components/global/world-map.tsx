'use client';

import { useEffect, useMemo, useState } from 'react';
import { Building2, Factory, Handshake } from 'lucide-react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { FadeIn } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import {
  MAP_DIMENSIONS,
  MAP_PROJECTION,
  WORLD_MAP_GEO_URL,
} from '@/lib/map/world-atlas';
import { cn } from '@/lib/utils';
import type { GlobalLocation } from '@/types';

interface WorldMapProps {
  locations: GlobalLocation[];
  labels: {
    offices: string;
    facilities: string;
    partners: string;
    countries: string;
    selectLocation: string;
    filterAll: string;
    typeOffice: string;
    typeFacility: string;
    typePartner: string;
  };
  compact?: boolean;
  defaultLocationId?: string;
  showStats?: boolean;
  showList?: boolean;
}

const TYPE_ICONS = {
  office: Building2,
  facility: Factory,
  partner: Handshake,
};

const geographyStyle = {
  default: {
    fill: '#e7e5e4',
    stroke: '#d6d3d1',
    strokeWidth: 0.5,
    outline: 'none',
  },
  hover: {
    fill: '#d6d3d1',
    stroke: '#a8a29e',
    strokeWidth: 0.5,
    outline: 'none',
  },
  pressed: {
    fill: '#d6d3d1',
    stroke: '#a8a29e',
    strokeWidth: 0.5,
    outline: 'none',
  },
} as const;

type LocationFilter = 'all' | GlobalLocation['type'];

export function WorldMap({
  locations,
  labels,
  compact = false,
  defaultLocationId = 'hq',
  showStats = true,
  showList = true,
}: WorldMapProps) {
  const [selected, setSelected] = useState<GlobalLocation | null>(null);
  const [typeFilter, setTypeFilter] = useState<LocationFilter>('all');
  const height = compact ? MAP_DIMENSIONS.compactHeight : MAP_DIMENSIONS.height;
  const scale = compact ? MAP_PROJECTION.compactScale : MAP_PROJECTION.scale;

  const filteredLocations = useMemo(
    () =>
      typeFilter === 'all'
        ? locations
        : locations.filter((location) => location.type === typeFilter),
    [locations, typeFilter]
  );

  useEffect(() => {
    const defaultLocation =
      locations.find((location) => location.id === defaultLocationId) ?? locations[0] ?? null;
    setSelected(defaultLocation);
  }, [locations, defaultLocationId]);

  useEffect(() => {
    if (selected && !filteredLocations.some((location) => location.id === selected.id)) {
      setSelected(filteredLocations[0] ?? null);
    }
  }, [filteredLocations, selected]);

  const typeCounts = {
    office: locations.filter((location) => location.type === 'office').length,
    facility: locations.filter((location) => location.type === 'facility').length,
    partner: locations.filter((location) => location.type === 'partner').length,
  };
  const countries = new Set(locations.map((location) => location.country)).size;

  const typeLabel: Record<GlobalLocation['type'], string> = {
    office: labels.typeOffice,
    facility: labels.typeFacility,
    partner: labels.typePartner,
  };

  const filterOptions: Array<{ id: LocationFilter; label: string }> = [
    { id: 'all', label: labels.filterAll },
    { id: 'office', label: labels.typeOffice },
    { id: 'facility', label: labels.typeFacility },
    { id: 'partner', label: labels.typePartner },
  ];

  const selectLocation = (location: GlobalLocation) => {
    setSelected(location);
  };

  return (
    <div>
      {showStats && (
        <div
          className={cn(
            'grid gap-4 mb-8',
            compact ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-4 mb-10'
          )}
        >
          {[
            { key: 'offices', count: typeCounts.office, label: labels.offices },
            { key: 'facilities', count: typeCounts.facility, label: labels.facilities },
            { key: 'partners', count: typeCounts.partner, label: labels.partners },
            { key: 'countries', count: countries, label: labels.countries },
          ].map((stat) => (
            <div
              key={stat.key}
              className={cn(
                'bg-white rounded-xl border border-neutral-100 text-center',
                compact ? 'p-4' : 'p-5'
              )}
            >
              <p className={cn('font-bold text-primary', compact ? 'text-2xl' : 'text-3xl')}>
                {stat.count}
              </p>
              <p className="text-sm text-neutral-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label={labels.filterAll}>
        {filterOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setTypeFilter(option.id)}
            aria-pressed={typeFilter === option.id}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium border transition-colors',
              typeFilter === option.id
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary/40'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className={cn('grid gap-8', showList ? 'lg:grid-cols-3' : '')}>
        <FadeIn className={showList ? 'lg:col-span-2' : ''}>
          <p className="sr-only">{labels.selectLocation}</p>
          <div className="relative bg-[#f5f5f4] rounded-2xl border border-neutral-100 overflow-hidden">
            <ComposableMap
              width={MAP_DIMENSIONS.width}
              height={height}
              projection="geoEqualEarth"
              projectionConfig={{
                scale,
                center: MAP_PROJECTION.center,
              }}
              className="w-full h-auto"
              style={{ width: '100%', height: 'auto' }}
            >
              <rect
                x={0}
                y={0}
                width={MAP_DIMENSIONS.width}
                height={height}
                fill="#f5f5f4"
              />
              <Geographies geography={WORLD_MAP_GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={geographyStyle}
                    />
                  ))
                }
              </Geographies>
              {filteredLocations.map((location) => {
                const isActive = selected?.id === location.id;
                const markerLabel = `${location.name}, ${location.city}, ${location.country}`;

                return (
                  <Marker key={location.id} coordinates={location.coordinates}>
                    {isActive && (
                      <circle
                        r={14}
                        fill="rgba(227, 6, 19, 0.18)"
                        className="animate-pulse pointer-events-none"
                      />
                    )}
                    <circle
                      r={isActive ? 7 : 5}
                      fill={isActive ? '#E30613' : 'rgba(227, 6, 19, 0.75)'}
                      stroke="#ffffff"
                      strokeWidth={1.5}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isActive}
                      aria-label={markerLabel}
                      className="cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                      onClick={() => selectLocation(location)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          selectLocation(location);
                        }
                      }}
                    />
                  </Marker>
                );
              })}
            </ComposableMap>
          </div>
        </FadeIn>

        {showList && (
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl border border-neutral-100 p-6 h-full">
              {selected ? (
                <div>
                  <Badge variant="secondary" className="mb-3">
                    {typeLabel[selected.type]}
                  </Badge>
                  <h3 className="text-h4 font-bold text-neutral-900 mb-1">{selected.name}</h3>
                  <p className="text-sm text-neutral-500 mb-4">
                    {selected.city}, {selected.country}
                  </p>
                  {selected.description && (
                    <p className="text-sm text-neutral-600 leading-relaxed">{selected.description}</p>
                  )}
                </div>
              ) : (
                <p className="text-neutral-500 text-sm">{labels.selectLocation}</p>
              )}

              <div className="mt-8 space-y-2 max-h-64 overflow-y-auto">
                {filteredLocations.map((location) => {
                  const Icon = TYPE_ICONS[location.type];
                  return (
                    <button
                      key={location.id}
                      type="button"
                      onClick={() => selectLocation(location)}
                      className={cn(
                        'w-full flex items-center gap-3 p-3 rounded-lg text-left text-sm transition-colors',
                        selected?.id === location.id
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-neutral-50 text-neutral-700'
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">
                        {location.city}, {location.country}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
