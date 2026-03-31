export function generateTShirtPath(chest) {
  const scale = chest / 100;
  const halfWidth = 100 * scale;
  const bodyHeight = 150 * scale;
  const neckWidth = 30 * scale;
  const neckDepth = 20 * scale;
  const sleeveWidth = 50 * scale;
  const sleeveHeight = 40 * scale;

  // Center point
  const cx = 200;
  const cy = 50;

  // drawing basic T-shirts
  const path = `
    M ${cx - neckWidth} ${cy}
    L ${cx - halfWidth} ${cy + sleeveHeight}
    L ${cx - halfWidth + sleeveWidth} ${cy + sleeveHeight}
    L ${cx - halfWidth + sleeveWidth} ${cy}
    L ${cx - neckWidth} ${cy}
    Q ${cx} ${cy + neckDepth} ${cx + neckWidth} ${cy}
    L ${cx + halfWidth - sleeveWidth} ${cy}
    L ${cx + halfWidth - sleeveWidth} ${cy + sleeveHeight}
    L ${cx + halfWidth} ${cy + sleeveHeight}
    L ${cx + neckWidth} ${cy}
    L ${cx + halfWidth} ${cy + bodyHeight}
    L ${cx - halfWidth} ${cy + bodyHeight}
    Z
  `;

  return path.replace(/\s+/g, ' ').trim();
}