
CREATE TABLE public.swap_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill_offered text NOT NULL DEFAULT '',
  skill_requested text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  credits integer NOT NULL DEFAULT 1,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.swap_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own swap requests"
  ON public.swap_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = requester_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can create swap requests"
  ON public.swap_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Receiver can update swap request status"
  ON public.swap_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = receiver_id);
