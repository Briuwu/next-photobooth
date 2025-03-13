import Link from "next/link";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/" className="font-sail">
        RetroPhotobooth
      </Link>
      <Button variant="link" className="text-xl">
        About
      </Button>
    </header>
  );
};
