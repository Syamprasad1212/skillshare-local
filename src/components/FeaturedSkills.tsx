import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const skills = [
  { name: "Python", demand: 94, category: "Tech" },
  { name: "Guitar", demand: 78, category: "Music" },
  { name: "UI/UX Design", demand: 89, category: "Design" },
  { name: "Photography", demand: 72, category: "Creative" },
  { name: "Spanish", demand: 85, category: "Language" },
  { name: "Cooking", demand: 68, category: "Lifestyle" },
  { name: "Data Science", demand: 91, category: "Tech" },
  { name: "Yoga", demand: 65, category: "Wellness" },
];

const FeaturedSkills = () => {
  return (
    <section className="bg-card py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <h2 className="mb-2 font-display text-3xl font-bold text-foreground md:text-4xl">
              Trending Skills 🔥
            </h2>
            <p className="text-muted-foreground">Most requested skills in your area right now.</p>
          </div>
          <TrendingUp className="hidden h-8 w-8 text-secondary md:block" />
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/30 hover:shadow-card-hover"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-display text-base font-semibold text-foreground">{skill.name}</span>
                <Badge variant="secondary" className="text-xs">{skill.category}</Badge>
              </div>
              <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.demand}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
              <span className="text-xs text-muted-foreground">{skill.demand}% demand</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSkills;
