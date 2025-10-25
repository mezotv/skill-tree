import { StackClientApp } from "@stackframe/react";

export const stackClientApp = new StackClientApp({ 
  tokenStore: "cookie", 
  projectId: 'INSERT_PROJECT_ID', 
  publishableClientKey: 'INSERT_YOUR_PUBLISHABLE_CLIENT_KEY_HERE', 
}); 
