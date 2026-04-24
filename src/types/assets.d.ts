declare module "*.png" {
  const content: number;
  export default content;
}

declare module "*.jpg" {
  const content: number;
  export default content;
}

declare module "*.jpeg" {
  const content: number;
  export default content;
}

declare module "*.svg" {
  const content: number;
  export default content;
}

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
