export function generateTShirtPath(chest) {
  const scale = chest / 100;
  
  const cx = 200;
  const cy = 25;

  const bodyWidth = 75 * scale;
  const bodyHeight = 230 * scale;
  const shoulderWidth = 70 * scale;
  const neckWidth = 30 * scale;
  const neckDepth = 25 * scale;
  const sleeveOuterLength = 50 * scale;
  const sleeveDropAngle = 45 * scale;
  const hemWidth = 90 * scale;

  const shoulderY = cy + 10 * scale;
  const hemY = cy + bodyHeight;
  
  const sleeveOuterX = shoulderWidth + sleeveOuterLength;
  const sleeveOuterY = shoulderY + sleeveDropAngle;
  
  const sleeveCuffX = bodyWidth + 5 * scale;
  const sleeveCuffY = sleeveOuterY + 20 * scale;
  
  const armholeX = bodyWidth;
  const armholeY = cy + 79 * scale;

  const path = `
    M ${cx - neckWidth} ${cy}
    
    Q ${cx} ${cy + neckDepth}
      ${cx + neckWidth} ${cy}
    
    L ${cx + shoulderWidth} ${shoulderY}
    
    Q ${cx + shoulderWidth + sleeveOuterLength * 0.5} ${shoulderY + sleeveDropAngle * 0.4}
      ${cx + sleeveOuterX} ${sleeveOuterY}
    
    Q ${cx + sleeveOuterX + 3 * scale} ${sleeveOuterY + 12 * scale}
      ${cx + sleeveCuffX} ${sleeveCuffY}
    
    Q ${cx + bodyWidth + 5 * scale} ${armholeY - 10 * scale}
      ${cx + armholeX} ${armholeY}
    
    Q ${cx + bodyWidth + 3 * scale} ${hemY - 40 * scale}
      ${cx + hemWidth} ${hemY}
    
    Q ${cx} ${hemY + 8 * scale}
      ${cx - hemWidth} ${hemY}
    
    Q ${cx - bodyWidth - 3 * scale} ${hemY - 40 * scale}
      ${cx - armholeX} ${armholeY}
    
    Q ${cx - bodyWidth - 5 * scale} ${armholeY - 10 * scale}
      ${cx - sleeveCuffX} ${sleeveCuffY}
    
    Q ${cx - sleeveOuterX - 3 * scale} ${sleeveOuterY + 12 * scale}
      ${cx - sleeveOuterX} ${sleeveOuterY}
    
    Q ${cx - shoulderWidth - sleeveOuterLength * 0.5} ${shoulderY + sleeveDropAngle * 0.4}
      ${cx - shoulderWidth} ${shoulderY}
    
    L ${cx - neckWidth} ${cy}
    Z
  `;

  return path.replace(/\s+/g, ' ').trim();
}