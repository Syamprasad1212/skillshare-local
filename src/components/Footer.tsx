import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center md:flex-row md:justify-between md:text-left">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-display text-lg font-bold text-foreground">SkillSwap</span>
      </div>
      <p className="text-sm text-muted-foreground">
        © 2026 SkillSwap. Swap skills, not cash.
      </p>
    </div>
  </footer>
);

export default Footer;
