import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const CATEGORIES = ["Programming", "Design", "Music", "Language", "Business", "Fitness", "Cooking", "Photography", "Writing", "Other"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

interface AddSkillDialogProps {
  skillType: "teach" | "learn";
  onSkillAdded: () => void;
}

const AddSkillDialog = ({ skillType, onSkillAdded }: AddSkillDialogProps) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner");
  const [availability, setAvailability] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user || !skillName.trim()) {
      toast({ title: "Skill name required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("user_skills").insert({
      user_id: user.id,
      skill_name: skillName.trim(),
      skill_type: skillType,
      category,
      level,
      availability: availability.trim(),
    });
    setSaving(false);
    if (error) {
      toast({ title: "Error adding skill", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Skill added! 🎉" });
      setSkillName("");
      setCategory("Programming");
      setLevel("Beginner");
      setAvailability("");
      setOpen(false);
      onSkillAdded();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          Add {skillType === "teach" ? "Teaching" : "Learning"} Skill
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a skill to {skillType === "teach" ? "teach" : "learn"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Skill Name</Label>
            <Input placeholder="e.g. Python, Guitar, Spanish..." value={skillName} onChange={e => setSkillName(e.target.value)} maxLength={80} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Availability (optional)</Label>
            <Input placeholder="e.g. Weekday evenings" value={availability} onChange={e => setAvailability(e.target.value)} maxLength={200} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Add Skill"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSkillDialog;
