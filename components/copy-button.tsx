"use client";

import { Check, Copy } from "lucide-react";
import { useState, type FC } from "react";

interface CopyButtonProps {
  text: string;
}

export const CopyButton: FC<CopyButtonProps> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className="text-tertiary-foreground hover:text-foreground cursor-pointer rounded-md p-2 transition-colors hover:bg-neutral-200/60 dark:hover:bg-neutral-800"
    >
      {isCopied ? <Check size={15} /> : <Copy size={15} />}
    </button>
  );
};
