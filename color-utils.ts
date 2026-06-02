/**
 * Shared color utility functions for polish swatch rendering.
 */

/**
 * Determines if a hex color is perceptually "light" using relative luminance.
 */
export function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.85;
}

export interface FinishStyle {
  filter?: string;
  boxShadow?: string;
  showShine: boolean;
  isLight: boolean;
  opacity?: number;
  backgroundImage?: string;
  backgroundSize?: string;
  background?: string;
  isCateye?: boolean;
  finish?: string;
}

/**
 * Returns visual styles for rendering a polish swatch based on its finish type.
 */
export function getFinishStyles(finish: string, color: string): FinishStyle {
  const isLight = isLightColor(color);

  switch (finish) {
    case "Matte":
      return {
        filter: "saturate(0.8) contrast(0.9)",
        boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)",
        showShine: false,
        isLight,
      };
    case "Jelly":
      return {
        opacity: 0.85,
        filter: "brightness(1.1)",
        boxShadow: "inset 0 0 15px rgba(255,255,255,0.4)",
        showShine: true,
        isLight,
      };
    case "Cateye":
      return {
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%), 
                    linear-gradient(90deg, 
                      ${color}ee 0%,
                      ${color}ee 25%, 
                      ${color} 45%, 
                      ${color} 55%, 
                      ${color}ee 75%,
                      ${color}ee 100%
                    ),
                    linear-gradient(90deg, 
                      transparent 35%, 
                      rgba(255,255,255,0.5) 42%, 
                      rgba(255,255,255,0.9) 50%, 
                      rgba(255,255,255,0.5) 58%, 
                      transparent 65%
                    )`,
        filter: "contrast(1.25) brightness(1.15) saturate(1.25)",
        boxShadow: "inset 0 0 25px rgba(0,0,0,0.4), 0 0 15px rgba(255,255,255,0.3)",
        showShine: true,
        isCateye: true,
        isLight,
        finish: "Cateye",
      };
    case "Glitter":
      return {
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
        backgroundSize: "4px 4px",
        showShine: true,
        isLight,
      };
    case "Shimmer":
      return {
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
        backgroundSize: "2px 2px",
        showShine: true,
        isLight,
      };
    default: // Glossy
      return {
        showShine: true,
        isLight,
      };
  }
}
