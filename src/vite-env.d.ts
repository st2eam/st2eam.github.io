/// <reference types="vite/client" />

declare module '*.less' {
  const content: Record<string, string>;
  export default content;
}
