import { motion } from "framer-motion";
import { UserPlus, Search, Handshake, Star } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create Your Profile", desc: "List skills you can teach and skills you want to learn. Set your hourly credit rate." },
  { icon: Search, title: "Find a Match", desc: "Search nearby users by skill, distance, and rating. Our engine prioritizes the best matches." },
  { icon: Handshake, title: "Book & Exchange", desc: "Send a request, confirm the session, and learn together. Credits transfer automatically." },
  { icon: Star, title: "Rate & Grow", desc: "Rate your experience. Build reputation and unlock more opportunities in your community." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            How SkillSwap Works
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            Four simple steps to start exchanging skills in your neighborhood.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <step.icon className="h-6 w-6" />
              </div>
              <span className="absolute right-4 top-4 font-display text-4xl font-bold text-muted/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
