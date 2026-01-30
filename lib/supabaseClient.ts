useEffect(() => {
  const channel = supabase
    .channel('posts-realtime')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'posts',
      },
      (payload) => {
        setPosts((currentPosts) => [
          payload.new as any,
          ...currentPosts,
        ]);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
