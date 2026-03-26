
CREATE TABLE public.user_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  skill_name text NOT NULL DEFAULT '',
  skill_type text NOT NULL DEFAULT 'teach',
  category text NOT NULL DEFAULT 'Other',
  level text NOT NULL DEFAULT 'Beginner',
  availability text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all skills" ON public.user_skills
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert their own skills" ON public.user_skills
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own skills" ON public.user_skills
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own skills" ON public.user_skills
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER update_user_skills_updated_at
  BEFORE UPDATE ON public.user_skills
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
