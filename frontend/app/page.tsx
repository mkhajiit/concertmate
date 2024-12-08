'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
      console.log(result);
    };

    fetchData().catch((error) => {
      console.error('Error fetching API data:', error);
    });
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
      {data?.map((d: any) => {
        return (
          <ul key={d.mt20id}>
            <img src={d.poster} alt='poster' />
            <p>{d.fcltynm}</p>
            <p>{d.genrenm}</p>
          </ul>
        );
      })}
    </div>
  );
}
