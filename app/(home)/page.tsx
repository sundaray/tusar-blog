// app/page.tsx

import { AnimatedSignInButton } from "@/components/animated-sign-in-button";

export default function Home() {
  return (
    <div className="grid min-h-screen place-content-center">
      <AnimatedSignInButton />
    </div>
  );
}
