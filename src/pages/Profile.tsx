import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, ArrowDownLeft, Star, MapPin, Clock, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const transactions = [
  { id: 1, type: "earned", skill: "Python Tutoring", with: "Rohan Das", credits: 2, date: "Mar 21" },
  { id: 2, type: "spent", skill: "Guitar Lesson", with: "Arjun Mehta", credits: 1, date: "Mar 19" },
  { id: 3, type: "earned", skill: "Data Science", with: "Ananya Gupta", credits: 3, date: "Mar 16" },
  { id: 4, type: "spent", skill: "Photography", with: "Sneha Patel", credits: 2, date: "Mar 14" },
];

const Profile = () => {
  const balance = 14;
  const earned = 24;
  const spent = 10;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Profile header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
              PS
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Priya Sharma</h1>
              <p className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> Bangalore, India • 2 km radius</p>
              <div className="mt-1 flex items-center gap-1 text-sm">
                <Star className="h-3.5 w-3.5 text-secondary" />
                <span className="font-medium text-foreground">4.9</span>
                <span className="text-muted-foreground">(28 reviews)</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2"><Edit className="h-4 w-4" /> Edit Profile</Button>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Wallet card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border p-6 shadow-card lg:col-span-1" style={{ background: "var(--gradient-hero)" }}>
            <div className="mb-6 flex items-center gap-2 text-primary-foreground/80">
              <Wallet className="h-5 w-5" />
              <span className="text-sm font-medium">Time Credit Wallet</span>
            </div>
            <div className="mb-6">
              <span className="font-display text-5xl font-bold text-primary-foreground">{balance}</span>
              <span className="ml-2 text-primary-foreground/70">credits</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-primary-foreground/10 p-3">
                <div className="flex items-center gap-1 text-xs text-primary-foreground/70"><ArrowDownLeft className="h-3 w-3" /> Earned</div>
                <span className="font-display text-lg font-bold text-primary-foreground">{earned}</span>
              </div>
              <div className="rounded-lg bg-primary-foreground/10 p-3">
                <div className="flex items-center gap-1 text-xs text-primary-foreground/70"><ArrowUpRight className="h-3 w-3" /> Spent</div>
                <span className="font-display text-lg font-bold text-primary-foreground">{spent}</span>
              </div>
            </div>
          </motion.div>

          {/* Skills & Activity */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6 lg:col-span-2">
            {/* Skills */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">My Skills</h2>
              <div className="space-y-4">
                {[
                  { name: "Python & ML", type: "teach", rate: 2, level: 90 },
                  { name: "Data Science", type: "teach", rate: 3, level: 85 },
                  { name: "Guitar", type: "learn", rate: 1, level: 20 },
                ].map(skill => (
                  <div key={skill.name} className="flex items-center gap-4">
                    <Badge variant={skill.type === "teach" ? "default" : "outline"} className="w-16 justify-center text-xs">
                      {skill.type === "teach" ? "Teach" : "Learn"}
                    </Badge>
                    <div className="flex-1">
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" />{skill.rate} cr/hr</span>
                      </div>
                      <Progress value={skill.level} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transactions */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Recent Transactions</h2>
              <div className="space-y-3">
                {transactions.map(tx => (
                  <div key={tx.id} className="flex items-center justify-between rounded-lg bg-background p-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${tx.type === "earned" ? "bg-accent text-accent-foreground" : "bg-secondary/20 text-secondary-foreground"}`}>
                        {tx.type === "earned" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{tx.skill}</p>
                        <p className="text-xs text-muted-foreground">with {tx.with} • {tx.date}</p>
                      </div>
                    </div>
                    <span className={`font-display font-semibold ${tx.type === "earned" ? "text-primary" : "text-foreground"}`}>
                      {tx.type === "earned" ? "+" : "-"}{tx.credits} cr
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
