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
      className="rounded-md p-2 text-neutral-700 transition-colors hover:bg-neutral-200"
    >
      {isCopied ? <Check size={15} /> : <Copy size={15} />}
    </button>
  );
};
