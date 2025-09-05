import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function AnimatedSignInButton() {
  return (
    <Button className="group relative flex items-center justify-center overflow-hidden">
      <span>Sign In</span>

      <div className="relative -ml-1 size-4">
        <ChevronRight className="absolute left-0 top-0 size-4 transition-all duration-300 ease-in-out group-hover:translate-x-4 group-hover:opacity-0" />

        {/* Icon 2: The one that's hidden and slides in */}
        <ChevronRight className="absolute left-0 top-0 size-4 -translate-x-4 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
    </Button>
  );
}
