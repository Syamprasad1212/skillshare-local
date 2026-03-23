import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl p-12 text-center md:p-20"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
          <div className="relative z-10">
            <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground md:text-5xl">
              Your skills are worth something.
            </h2>
            <p className="mx-auto mb-8 max-w-md text-primary-foreground/80">
              Join thousands who are already trading time, not money. Start building your skill economy today.
            </p>
            <Button size="lg" variant="secondary" asChild className="gap-2 px-8 text-base">
              <Link to="/discover">
                Join SkillSwap Free <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
