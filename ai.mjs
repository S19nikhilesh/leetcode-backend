useEffect(() => {
  const fetchProblems = async () => {
      try {
          // 3. Use 'id' here
          const res = await axiosClient.get(`/problem/ProblemById/${id}`);
          setProblems(res.data);
      } catch (err) {
          console.error("API Error:", err);
      }
  };
  
  if (id) fetchProblems();
}, [id]);