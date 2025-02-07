// //  Function to convert hex code to RGB for easier manipulation
// function hexToRgb(hex) {
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result ? result.slice(1).map((x) => parseInt(x, 16)) : null;
// }

// function getSlightlyFainterColor(hex, opacity = 0.8) {
//   const rgb = hexToRgb(hex);
//   if (rgb) {
//     return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
//   }
//   return hex;
//   //  Return original hex code if conversion fails
//   console.log(hex);
// }

// function adjustColor(hex: any, amount: any) {
//   let r = parseInt(hex.slice(1, 3), 16);
//   let g = parseInt(hex.slice(3, 5), 16);
//   let b = parseInt(hex.slice(5, 7), 16);

//   r = Math.min(255, Math.max(0, r + amount));
//   g = Math.min(255, Math.max(0, g + amount));
//   b = Math.min(255, Math.max(0, b + amount));

//   return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
// }

// const darkerThemeColor = adjustColor(themeColor, 21);
// console.log(themeColor);
// console.log(darkerThemeColor);
// console.log(hex);
