import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { icon: Users, value: "2,400+", label: "Active Swappers" },
  { icon: Clock, value: "12,000+", label: "Hours Exchanged" },
  { icon: MapPin, value: "85+", label: "Neighborhoods" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
        <div className="absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            No money needed — just your time & talent
          </div>

          <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
            Swap Skills,{" "}
            <span className="text-gradient">Not Cash</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            Teach what you know, learn what you need. SkillSwap connects you with
            nearby people for fair, time-credit-based skill exchange.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="gap-2 px-8 text-base">
              <Link to="/discover">
                Start Swapping <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-base">
              See How It Works
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 grid w-full max-w-2xl grid-cols-3 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <stat.icon className="h-5 w-5 text-primary" />
              <span className="font-display text-2xl font-bold text-foreground md:text-3xl">{stat.value}</span>
              <span className="text-xs text-muted-foreground md:text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
