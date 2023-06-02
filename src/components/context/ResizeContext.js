import React from "react";
const ResizeContext = React.createContext({
  getWidth: () => {},
  getHeight: () => {},
});

export const ResizeProvider = ResizeContext.Provider;
export default ResizeContext;
