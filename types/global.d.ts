// Minimal declaration to satisfy TypeScript when using process.env in browser bundles
// Next.js replaces process.env.NEXT_PUBLIC_* at build time. This avoids needing @types/node.
declare var process: any;
