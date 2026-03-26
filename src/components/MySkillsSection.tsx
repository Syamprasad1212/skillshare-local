import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import AddSkillDialog from "./AddSkillDialog";
import EditSkillDialog, { type UserSkill } from "./EditSkillDialog";

const MySkillsSection = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("user_skills")
      .select("id, user_id, skill_name, skill_type, category, level, availability")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setSkills((data as UserSkill[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchSkills(); }, [user]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("user_skills").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting skill", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Skill removed" });
      fetchSkills();
    }
  };

  const teachSkills = skills.filter(s => s.skill_type === "teach");
  const learnSkills = skills.filter(s => s.skill_type === "learn");

  if (loading) return <p className="text-sm text-muted-foreground">Loading skills...</p>;

  return (
    <div className="space-y-6">
      {/* Teach */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground">Skills I Can Teach</h3>
          <AddSkillDialog skillType="teach" onSkillAdded={fetchSkills} />
        </div>
        {teachSkills.length === 0 ? (
          <p className="text-sm text-muted-foreground">No teaching skills added yet.</p>
        ) : (
          <div className="space-y-2">
            {teachSkills.map(skill => (
              <div key={skill.id} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                <Badge className="shrink-0 text-xs">Teach</Badge>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-foreground text-sm">{skill.skill_name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{skill.category} · {skill.level}</span>
                  {skill.availability && <span className="ml-2 text-xs text-muted-foreground">· {skill.availability}</span>}
                </div>
                <EditSkillDialog skill={skill} onUpdated={fetchSkills} />
                <button onClick={() => handleDelete(skill.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Learn */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground">Skills I Want to Learn</h3>
          <AddSkillDialog skillType="learn" onSkillAdded={fetchSkills} />
        </div>
        {learnSkills.length === 0 ? (
          <p className="text-sm text-muted-foreground">No learning skills added yet.</p>
        ) : (
          <div className="space-y-2">
            {learnSkills.map(skill => (
              <div key={skill.id} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                <Badge variant="outline" className="shrink-0 text-xs">Learn</Badge>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-foreground text-sm">{skill.skill_name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{skill.category} · {skill.level}</span>
                  {skill.availability && <span className="ml-2 text-xs text-muted-foreground">· {skill.availability}</span>}
                </div>
                <EditSkillDialog skill={skill} onUpdated={fetchSkills} />
                <button onClick={() => handleDelete(skill.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySkillsSection;
