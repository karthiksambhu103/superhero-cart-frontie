import { useEffect, useState } from 'react';

function Visit() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Fetch the visit count from the backend API
    const fetchVisitCount = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/list/visit');
        const data = await response.json();
        setVisitCount(data.visitCount); // Set the visit count in state
      } catch (error) {
        console.error('Error fetching visit count:', error);
      }
    };

    fetchVisitCount();
  }, []);

  return (
    <div style={{ margin: '20px', borderBottom:"1px solid black" }}>
      <h1>Welcome to superHero Website</h1>
      <p>Total Visitors: {visitCount}</p>
    </div>
  );
}

export default Visit;
