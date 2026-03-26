import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const CATEGORIES = ["Programming", "Design", "Music", "Language", "Business", "Fitness", "Cooking", "Photography", "Writing", "Other"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export interface UserSkill {
  id: string;
  user_id: string;
  skill_name: string;
  skill_type: string;
  category: string;
  level: string;
  availability: string;
}

interface EditSkillDialogProps {
  skill: UserSkill;
  onUpdated: () => void;
}

const EditSkillDialog = ({ skill, onUpdated }: EditSkillDialogProps) => {
  const [open, setOpen] = useState(false);
  const [skillName, setSkillName] = useState(skill.skill_name);
  const [category, setCategory] = useState(skill.category);
  const [level, setLevel] = useState(skill.level);
  const [availability, setAvailability] = useState(skill.availability);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!skillName.trim()) {
      toast({ title: "Skill name required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("user_skills").update({
      skill_name: skillName.trim(),
      category,
      level,
      availability: availability.trim(),
    }).eq("id", skill.id);
    setSaving(false);
    if (error) {
      toast({ title: "Error updating skill", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Skill updated!" });
      setOpen(false);
      onUpdated();
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-muted-foreground hover:text-foreground transition-colors">
        <Pencil className="h-3.5 w-3.5" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Skill Name</Label>
              <Input value={skillName} onChange={e => setSkillName(e.target.value)} maxLength={80} />
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
              <Label>Availability</Label>
              <Input value={availability} onChange={e => setAvailability(e.target.value)} maxLength={200} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditSkillDialog;
