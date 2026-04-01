export function generateTShirtPath(chest) {
  // Chest offset: affects side seam from armpit to chest
  const chestOffset = (chest - 100) * 0.5; // pixels per cm deviation
  
  const cx = 200;
  const cy = 25;

  // === FIXED dimensions (locked) ===
  const bodyHeight = 250;
  const shoulderWidth = 70;
  const neckWidth = 40;
  const neckDepth = 45;
  const sleeveOuterLength = 40;
  const sleeveDropAngle = 55;
  const shoulderY = cy + 10;
  const hemWidth = 70;    // fixed hem width
  
  // Sleeve positions - both edges move together to keep sleeve width constant
  const sleeveMove = chestOffset * 0.5;  // how much the entire sleeve shifts
  const baseSleeveOuterX = shoulderWidth + sleeveOuterLength;
  const sleeveOuterX = baseSleeveOuterX + sleeveMove;
  const sleeveOuterY = shoulderY + sleeveDropAngle;
  
  // === DYNAMIC: sleeve inner edge moves same amount as outer ===
  const baseSleeveCuffX = 73;
  const sleeveCuffX = baseSleeveCuffX + sleeveMove;  // same shift amount
  const sleeveCuffY = sleeveOuterY + 20;
  
  // === KEY VERTICAL POSITIONS ===
  const armpitY = sleeveCuffY;
  const chestY = armpitY + 30;
  const hemY = cy + bodyHeight;
  const midpointY = (chestY + hemY) / 2;
  
  // === DYNAMIC: chest width ===
  const baseChestWidth = 65;
  const chestWidth = baseChestWidth + chestOffset;
  
  // Midpoint width - interpolate smoothly between chest and hem
  const midpointWidth = (chestWidth + hemWidth) / 2 - 2;  // slight inward curve

  // Build path - straight line armpit to chest, then smooth curve to hem
  const path = `
    M ${cx - neckWidth} ${cy}
    
    Q ${cx} ${cy + neckDepth}
      ${cx + neckWidth} ${cy}
    
    L ${cx + shoulderWidth} ${shoulderY}
    
    Q ${cx + shoulderWidth + sleeveOuterLength * 0.5} ${shoulderY + sleeveDropAngle * 0.4}
      ${cx + sleeveOuterX} ${sleeveOuterY}
    
    Q ${cx + sleeveOuterX + 3} ${sleeveOuterY + 12}
      ${cx + sleeveCuffX} ${sleeveCuffY}
    
    L ${cx + chestWidth} ${chestY}
    
    C ${cx + chestWidth} ${midpointY - 15}
      ${cx + hemWidth - 5} ${midpointY + 15}
      ${cx + hemWidth} ${hemY}
    
    Q ${cx} ${hemY + 8}
      ${cx - hemWidth} ${hemY}
    
    C ${cx - hemWidth + 5} ${midpointY + 15}
      ${cx - chestWidth} ${midpointY - 15}
      ${cx - chestWidth} ${chestY}
    
    L ${cx - sleeveCuffX} ${sleeveCuffY}
    
    Q ${cx - sleeveOuterX - 3} ${sleeveOuterY + 12}
      ${cx - sleeveOuterX} ${sleeveOuterY}
    
    Q ${cx - shoulderWidth - sleeveOuterLength * 0.5} ${shoulderY + sleeveDropAngle * 0.4}
      ${cx - shoulderWidth} ${shoulderY}
    
    L ${cx - neckWidth} ${cy}
    Z
  `;

  return path.replace(/\s+/g, ' ').trim();
}
