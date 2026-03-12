const palettes = [
  {
    accentColor: (opacity) => `rgba(128, 0, 255,${opacity})`,
    secondaryColor: (opacity) => `rgba(238, 222, 255,${opacity})`,
    primaryColor: (opacity) => `rgba(171, 35, 255,${opacity})`,
    exColor: (opacity) => `rgba(136,255,0,${opacity})`,
    dark:'rgba(255,255,255,1)',
    white:'rgba(0,0,0,0.8)',
  },
];
export const theme = palettes[0];
