import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Clock, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProfileUser {
  id: string;
  user_id: string;
  full_name: string;
  skills_offered: string[];
  skills_requested: string[];
  rating: number;
  hourly_credit_rate: number;
  location: string;
  availability: string;
  bio: string;
}

const Discover = () => {
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState<ProfileUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<ProfileUser | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, user_id, full_name, skills_offered, skills_requested, rating, hourly_credit_rate, location, availability, bio");
      if (!error && data) {
        // Exclude current user
        setProfiles(data.filter(p => p.user_id !== user?.id));
      }
      setLoading(false);
    };
    fetchProfiles();
  }, [user]);

  // Current user's profile for matching
  const [myProfile, setMyProfile] = useState<ProfileUser | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchMyProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, user_id, full_name, skills_offered, skills_requested, rating, hourly_credit_rate, location, availability, bio")
        .eq("user_id", user.id)
        .single();
      if (data) setMyProfile(data);
    };
    fetchMyProfile();
  }, [user]);

  const getMatchScore = (profile: ProfileUser): number => {
    if (!myProfile) return 0;
    let score = 0;
    // They teach what I want to learn
    for (const skill of profile.skills_offered) {
      if (myProfile.skills_requested.some(s => s.toLowerCase() === skill.toLowerCase())) score += 2;
    }
    // I teach what they want to learn
    for (const skill of profile.skills_requested) {
      if (myProfile.skills_offered.some(s => s.toLowerCase() === skill.toLowerCase())) score += 1;
    }
    return score;
  };

  const filtered = profiles
    .filter(u =>
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.skills_offered.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      u.skills_requested.some(s => s.toLowerCase().includes(search.toLowerCase()))
    )
    .map(p => ({ ...p, matchScore: getMatchScore(p) }))
    .sort((a, b) => b.matchScore - a.matchScore);

  const handleRequestSwap = (profile: ProfileUser) => {
    if (!user) {
      toast({ title: "Please log in", description: "You need to be logged in to request a swap.", variant: "destructive" });
      navigate("/auth");
      return;
    }
    setSelectedUser(profile);
    setMessage("");
    setDialogOpen(true);
  };

  const handleSendRequest = async () => {
    if (!user || !selectedUser) return;
    setSending(true);
    const { error } = await supabase.from("swap_requests").insert({
      requester_id: user.id,
      receiver_id: selectedUser.user_id,
      skill_requested: selectedUser.skills_offered[0] || "",
      message,
      credits: selectedUser.hourly_credit_rate,
    });
    setSending(false);
    setDialogOpen(false);
    if (error) {
      toast({ title: "Request failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Request sent! 🎉", description: `Your swap request has been sent to ${selectedUser.full_name}.` });
    }
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "?";
  };

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
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="credits">Lowest Credits</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="py-20 text-center text-muted-foreground">Loading profiles...</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((profile, i) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {getInitials(profile.full_name)}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{profile.full_name || "Unnamed"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {profile.skills_offered.length > 0 ? profile.skills_offered[0] : "No skills listed"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {profile.skills_offered.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{profile.location || "N/A"}</span>
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-secondary" />{Number(profile.rating).toFixed(1)}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{profile.hourly_credit_rate} cr/hr</span>
                </div>

                <Button className="mt-4 w-full" size="sm" onClick={() => handleRequestSwap(profile)}>
                  Request Swap
                </Button>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">No skills found matching your search.</div>
        )}
      </div>
      <Footer />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Swap with {selectedUser?.full_name}</DialogTitle>
            <DialogDescription>
              Send a swap request for <strong>{selectedUser?.skills_offered[0]}</strong> at {selectedUser?.hourly_credit_rate} credits/hr.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Add a message (optional)..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={3}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSendRequest} disabled={sending}>
              {sending ? "Sending..." : "Send Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Discover;
