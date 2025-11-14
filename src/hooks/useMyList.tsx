import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

interface ListItem {
  id: string;
  content_id: string;
  title: string;
  image: string;
  rating?: string;
  year?: string;
}

export const useMyList = () => {
  const [list, setList] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchList();
      
      // Set up realtime subscription
      const channel = supabase
        .channel('my_list_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'my_list',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            fetchList();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setList([]);
      setLoading(false);
    }
  }, [user]);

  const fetchList = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('my_list')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching list:', error);
    } else {
      setList(data || []);
    }
    setLoading(false);
  };

  const addToList = async (item: Omit<ListItem, 'id'>) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to add items to your list",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('my_list')
      .insert({
        user_id: user.id,
        content_id: item.content_id,
        title: item.title,
        image: item.image,
        rating: item.rating,
        year: item.year,
      });

    if (error) {
      if (error.code === '23505') {
        toast({
          title: "Already in List",
          description: "This item is already in your list",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add to list",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Added to List",
        description: "Item added successfully",
      });
    }
  };

  const removeFromList = async (contentId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('my_list')
      .delete()
      .eq('user_id', user.id)
      .eq('content_id', contentId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove from list",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Removed",
        description: "Item removed from your list",
      });
    }
  };

  const isInList = (contentId: string) => {
    return list.some(item => item.content_id === contentId);
  };

  return { list, loading, addToList, removeFromList, isInList };
};