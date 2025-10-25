import { StackHandler, useUser } from "@stackframe/stack";
import { stackClientApp } from "@/stack/client";
import { stackServerApp } from "@/stack/server";

export default function HandlerPage(props: any) {
  return <StackHandler app={stackServerApp} fullPage routeProps={props} />;
}
