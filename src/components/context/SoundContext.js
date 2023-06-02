import React from "react";
const SoundContext = React.createContext({
  sound: false,
  setSound: () => {},
  setContinueSound: () => {},
});

export const SoundProvider = SoundContext.Provider;
export default SoundContext;
