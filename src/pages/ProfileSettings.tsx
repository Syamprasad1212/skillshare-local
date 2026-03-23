import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Plus, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const ProfileSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [locationRadius, setLocationRadius] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(1);
  const [availability, setAvailability] = useState("");
  const [skillsOffered, setSkillsOffered] = useState<string[]>([]);
  const [skillsRequested, setSkillsRequested] = useState<string[]>([]);
  const [newOffered, setNewOffered] = useState("");
  const [newRequested, setNewRequested] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (error) {
        toast({ title: "Error loading profile", description: error.message, variant: "destructive" });
        setLoading(false);
        return;
      }
      if (data) {
        setFullName(data.full_name);
        setBio(data.bio);
        setLocation(data.location);
        setLocationRadius(data.location_radius);
        setHourlyRate(data.hourly_credit_rate);
        setAvailability(data.availability);
        setSkillsOffered(data.skills_offered);
        setSkillsRequested(data.skills_requested);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    if (!fullName.trim()) {
      toast({ title: "Name required", description: "Please enter your full name.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        bio: bio.trim(),
        location: location.trim(),
        location_radius: locationRadius,
        hourly_credit_rate: hourlyRate,
        availability: availability.trim(),
        skills_offered: skillsOffered,
        skills_requested: skillsRequested,
      })
      .eq("user_id", user.id);

    if (error) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated!", description: "Your changes have been saved." });
    }
    setSaving(false);
  };

  const addSkill = (type: "offered" | "requested") => {
    const value = type === "offered" ? newOffered.trim() : newRequested.trim();
    if (!value) return;
    if (type === "offered") {
      if (!skillsOffered.includes(value)) setSkillsOffered([...skillsOffered, value]);
      setNewOffered("");
    } else {
      if (!skillsRequested.includes(value)) setSkillsRequested([...skillsRequested, value]);
      setNewRequested("");
    }
  };

  const removeSkill = (type: "offered" | "requested", skill: string) => {
    if (type === "offered") setSkillsOffered(skillsOffered.filter(s => s !== skill));
    else setSkillsRequested(skillsRequested.filter(s => s !== skill));
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 pt-24 pb-12">
        <div className="mb-6 flex items-center gap-3">
          <Link to="/profile">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <h1 className="font-display text-2xl font-bold text-foreground">Profile Settings</h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-card">
          {/* Basic Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g. Bangalore, India" value={location} onChange={e => setLocation(e.target.value)} maxLength={100} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell others about yourself..." value={bio} onChange={e => setBio(e.target.value)} maxLength={500} rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <Input id="availability" placeholder="e.g. Weekdays 6-9 PM" value={availability} onChange={e => setAvailability(e.target.value)} maxLength={200} />
          </div>

          {/* Sliders */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <Label>Hourly Credit Rate: <span className="font-bold text-primary">{hourlyRate} cr/hr</span></Label>
              <Slider value={[hourlyRate]} onValueChange={v => setHourlyRate(v[0])} min={1} max={10} step={1} />
            </div>
            <div className="space-y-3">
              <Label>Location Radius: <span className="font-bold text-primary">{locationRadius} km</span></Label>
              <Slider value={[locationRadius]} onValueChange={v => setLocationRadius(v[0])} min={1} max={50} step={1} />
            </div>
          </div>

          {/* Skills Offered */}
          <div className="space-y-3">
            <Label>Skills Offered</Label>
            <div className="flex flex-wrap gap-2">
              {skillsOffered.map(s => (
                <Badge key={s} className="gap-1">
                  {s}
                  <button onClick={() => removeSkill("offered", s)}><X className="h-3 w-3" /></button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill you can teach..."
                value={newOffered}
                onChange={e => setNewOffered(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill("offered"))}
                maxLength={50}
              />
              <Button type="button" variant="outline" size="icon" onClick={() => addSkill("offered")}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Skills Requested */}
          <div className="space-y-3">
            <Label>Skills Requested</Label>
            <div className="flex flex-wrap gap-2">
              {skillsRequested.map(s => (
                <Badge key={s} variant="outline" className="gap-1">
                  {s}
                  <button onClick={() => removeSkill("requested", s)}><X className="h-3 w-3" /></button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill you want to learn..."
                value={newRequested}
                onChange={e => setNewRequested(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill("requested"))}
                maxLength={50}
              />
              <Button type="button" variant="outline" size="icon" onClick={() => addSkill("requested")}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>

          <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileSettings;
