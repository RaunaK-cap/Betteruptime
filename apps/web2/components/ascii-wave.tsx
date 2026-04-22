export const ASCII_WAVE = (() => {
  const rows = 50;
  const cols = 200;
  let map = "";
  for (let y = 0; y < rows; y++) {
    let row = "";
    for (let x = 0; x < cols; x++) {
      const nx = (x / cols) * 8;
      const ny = (y / rows) * 6;
      // Abstract wave topography math
      const val = Math.sin(nx * 3) * Math.cos(ny * 2) + Math.sin(nx + ny) * 0.9;
      
      if (val > 1.2) row += "●";
      else if (val > 0.8) row += "○";
      else if (val > 0.4) row += "•";
      else if (val > 0) row += "·";
      else if (val > -0.4) row += ".";
      else row += " ";
    }
    map += row + "\n";
  }
  return map;
})();
