export function generateTShirtPath(chest) {
  // Chest offset: affects side seam from armpit to chest
  const chestOffset = (chest - 100) * 0.5; // pixels per cm deviation
  
  const cx = 200;
  const cy = 25;

  // === FIXED dimensions (locked) ===
  const bodyHeight = 230;
  const shoulderWidth = 70;
  const neckWidth = 40;
  const neckDepth = 45;
  const sleeveOuterLength = 50;
  const sleeveDropAngle = 55;
  const shoulderY = cy + 10;
  const hemWidth = 70;    // fixed hem width
  
  // Sleeve positions
  const sleeveOuterX = shoulderWidth + sleeveOuterLength;
  const sleeveOuterY = shoulderY + sleeveDropAngle;
  
  // === DYNAMIC: sleeve inner edge moves with chest ===
  const baseSleeveCuffX = 73;
  const sleeveCuffX = baseSleeveCuffX + chestOffset * 1;  // sleeve inner moves out/in
  const sleeveCuffY = sleeveOuterY + 20;
  
  // === KEY VERTICAL POSITIONS ===
  const armpitY = sleeveCuffY;
  const chestY = armpitY + 30;
  const hemY = cy + bodyHeight;
  const midpointY = (chestY + hemY) / 2;
  
  // === DYNAMIC: chest width ===
  const baseChestWidth = 75;
  const chestWidth = baseChestWidth + chestOffset;
  
  // Midpoint width - interpolate smoothly between chest and hem
  const midpointWidth = (chestWidth + hemWidth) / 2 - 2;  // slight inward curve

  // Build path - one smooth curve from armpit to hem using connected beziers
  const path = `
    M ${cx - neckWidth} ${cy}
    
    Q ${cx} ${cy + neckDepth}
      ${cx + neckWidth} ${cy}
    
    L ${cx + shoulderWidth} ${shoulderY}
    
    Q ${cx + shoulderWidth + sleeveOuterLength * 0.5} ${shoulderY + sleeveDropAngle * 0.4}
      ${cx + sleeveOuterX} ${sleeveOuterY}
    
    Q ${cx + sleeveOuterX + 3} ${sleeveOuterY + 12}
      ${cx + sleeveCuffX} ${sleeveCuffY}
    
    C ${cx + sleeveCuffX + 4} ${armpitY + 12}
      ${cx + chestWidth + 3} ${chestY - 8}
      ${cx + chestWidth} ${chestY}
    
    C ${cx + chestWidth - 1} ${chestY + 35}
      ${cx + midpointWidth} ${midpointY - 20}
      ${cx + midpointWidth} ${midpointY}
    
    C ${cx + midpointWidth} ${midpointY + 30}
      ${cx + hemWidth - 2} ${hemY - 25}
      ${cx + hemWidth} ${hemY}
    
    Q ${cx} ${hemY + 8}
      ${cx - hemWidth} ${hemY}
    
    C ${cx - hemWidth + 2} ${hemY - 25}
      ${cx - midpointWidth} ${midpointY + 30}
      ${cx - midpointWidth} ${midpointY}
    
    C ${cx - midpointWidth} ${midpointY - 20}
      ${cx - chestWidth + 1} ${chestY + 35}
      ${cx - chestWidth} ${chestY}
    
    C ${cx - chestWidth - 3} ${chestY - 8}
      ${cx - sleeveCuffX - 4} ${armpitY + 12}
      ${cx - sleeveCuffX} ${sleeveCuffY}
    
    Q ${cx - sleeveOuterX - 3} ${sleeveOuterY + 12}
      ${cx - sleeveOuterX} ${sleeveOuterY}
    
    Q ${cx - shoulderWidth - sleeveOuterLength * 0.5} ${shoulderY + sleeveDropAngle * 0.4}
      ${cx - shoulderWidth} ${shoulderY}
    
    L ${cx - neckWidth} ${cy}
    Z
  `;

  return path.replace(/\s+/g, ' ').trim();
}
