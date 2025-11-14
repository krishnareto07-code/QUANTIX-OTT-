-- Create a table for user's favorite movies
CREATE TABLE public.my_list (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id text NOT NULL,
  title text NOT NULL,
  image text NOT NULL,
  rating text,
  year text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, content_id)
);

-- Enable Row Level Security
ALTER TABLE public.my_list ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own list" 
ON public.my_list 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own list" 
ON public.my_list 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their own list" 
ON public.my_list 
FOR DELETE 
USING (auth.uid() = user_id);

-- Enable realtime for my_list table
ALTER TABLE public.my_list REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.my_list;