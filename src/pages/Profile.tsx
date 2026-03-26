import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, ArrowDownLeft, Star, MapPin, Clock, Edit, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import MySkillsSection from "@/components/MySkillsSection";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-32 gap-4">
          <p className="text-muted-foreground">{loading ? "Loading dashboard..." : "No profile found. Please sign up first."}</p>
        </div>
      </div>
    );
  }

  const initials = profile.full_name
    ? profile.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Profile header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
              {initials}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">{profile.full_name || "New User"}</h1>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {profile.location || "No location set"} • {profile.location_radius} km radius
              </p>
              <div className="mt-1 flex items-center gap-1 text-sm">
                <Star className="h-3.5 w-3.5 text-secondary" />
                <span className="font-medium text-foreground">{Number(profile.rating).toFixed(1)}</span>
              </div>
            </div>
          </div>
          <Link to="/profile/settings">
            <Button variant="outline" size="sm" className="gap-2"><Settings className="h-4 w-4" /> Edit Profile</Button>
          </Link>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Wallet card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border p-6 shadow-card lg:col-span-1" style={{ background: "var(--gradient-hero)" }}>
            <div className="mb-6 flex items-center gap-2 text-primary-foreground/80">
              <Wallet className="h-5 w-5" />
              <span className="text-sm font-medium">Time Credit Wallet</span>
            </div>
            <div className="mb-6">
              <span className="font-display text-5xl font-bold text-primary-foreground">{profile.wallet_balance}</span>
              <span className="ml-2 text-primary-foreground/70">credits</span>
            </div>
            <div className="rounded-lg bg-primary-foreground/10 p-3">
              <div className="flex items-center gap-1 text-xs text-primary-foreground/70"><Clock className="h-3 w-3" /> Rate</div>
              <span className="font-display text-lg font-bold text-primary-foreground">{profile.hourly_credit_rate} cr/hr</span>
            </div>
          </motion.div>

          {/* Skills & Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6 lg:col-span-2">
            {/* Bio */}
            {profile.bio && (
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h2 className="mb-2 font-display text-lg font-semibold text-foreground">About</h2>
                <p className="text-sm text-muted-foreground">{profile.bio}</p>
              </div>
            )}

            {/* Skills */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">My Skills</h2>
              <MySkillsSection />
            </div>

            {/* Availability */}
            {profile.availability && (
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Availability</h2>
                <p className="text-sm text-muted-foreground">{profile.availability}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
