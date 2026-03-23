import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Clock, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mockUsers = [
  { id: 1, name: "Priya Sharma", skill: "Python & ML", rating: 4.9, distance: "0.8 km", credits: 2, avatar: "PS", tags: ["Tech", "AI"], available: true },
  { id: 2, name: "Arjun Mehta", skill: "Guitar Lessons", rating: 4.7, distance: "1.2 km", credits: 1, avatar: "AM", tags: ["Music"], available: true },
  { id: 3, name: "Sneha Patel", skill: "UI/UX Design", rating: 4.8, distance: "2.1 km", credits: 3, avatar: "SP", tags: ["Design", "Figma"], available: false },
  { id: 4, name: "Rohan Das", skill: "Photography", rating: 4.6, distance: "0.5 km", credits: 2, avatar: "RD", tags: ["Creative"], available: true },
  { id: 5, name: "Ananya Gupta", skill: "Spanish Language", rating: 5.0, distance: "1.8 km", credits: 1, avatar: "AG", tags: ["Language"], available: true },
  { id: 6, name: "Vikram Singh", skill: "Data Science", rating: 4.5, distance: "3.0 km", credits: 2, avatar: "VS", tags: ["Tech", "Analytics"], available: true },
];

const Discover = () => {
  const [search, setSearch] = useState("");
  const filtered = mockUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.skill.toLowerCase().includes(search.toLowerCase()) ||
    u.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="mb-2 font-display text-3xl font-bold text-foreground md:text-4xl">Discover Skills</h1>
          <p className="text-muted-foreground">Find mentors and learners near you.</p>
        </motion.div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search skills, names, or categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-44">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Nearest First</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="credits">Lowest Credits</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {user.avatar}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.skill}</p>
                  </div>
                </div>
                <div className={`h-2.5 w-2.5 rounded-full ${user.available ? "bg-primary" : "bg-muted-foreground/30"}`} title={user.available ? "Available" : "Busy"} />
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {user.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{user.distance}</span>
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-secondary" />{user.rating}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{user.credits} cr/hr</span>
              </div>

              <Button className="mt-4 w-full" size="sm">Request Swap</Button>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">No skills found matching your search.</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Discover;
