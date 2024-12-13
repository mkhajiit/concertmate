export default async function Home() {
  // 클라이언트 사이드
  // const [data, setData] = useState<any>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/data');
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const result = await response.json();
  //     setData(result);
  //     console.log(result);
  //   };

  //   fetchData().catch((error) => {
  //     console.error('Error fetching API data:', error);
  //   });
  // }, []);

  // 서버사이드에서 fetch를 사용할 때는 서버가 요청을 보내는 경로를 명확히 알아야 하기 때문에 절대 경로를 사용
  // 클라이언트 사이드에서는 브라우저가 현재 도메인을 기준으로 경로를 해석할 수 있기 때문에 상대 경로(/api/data)만으로도
  // 요청이 잘 처리됩니다. 하지만 서버사이드에서는 클라이언트처럼 도메인을 알 수 없기 때문에 절대 경로를 사용해야 정확한 경로로 요청을 보낼 수 있습니다.
  const response = await fetch('http://localhost:3000/api/data');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();

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
