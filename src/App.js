import "./App.css";
import { useState } from "react";
import VideoCard from "./components/card/VideoCard";
import { videos } from "./data/data";

function App() {
  const [mockData, setMockData] = useState(videos);

  const handleDelete = (id) => {
    setMockData(mockData.filter((profile) => profile.id !== id));
  };

  return (
    <div className="cards-container">
      {mockData.map((profile) => (
        <VideoCard key={profile.id} profile={profile} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default App;
