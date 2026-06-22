declare module 'react-simple-maps' {
  import type { CSSProperties, ReactNode, SVGProps } from 'react';

  export interface GeographyType {
    rsmKey: string;
    svgPath: string;
    properties: Record<string, unknown>;
  }

  export interface ComposableMapProps extends SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
    projection?: string;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number];
    };
    style?: CSSProperties;
    className?: string;
    children?: ReactNode;
  }

  export interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: GeographyType;
    style?: Record<string, CSSProperties>;
  }

  export interface MarkerProps extends SVGProps<SVGGElement> {
    coordinates: [number, number];
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (args: { geographies: GeographyType[] }) => ReactNode;
  }

  export function ComposableMap(props: ComposableMapProps): JSX.Element;
  export function Geographies(props: GeographiesProps): JSX.Element;
  export function Geography(props: GeographyProps): JSX.Element;
  export function Marker(props: MarkerProps): JSX.Element;
}
