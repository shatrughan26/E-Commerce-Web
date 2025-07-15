import React, { useEffect, useState } from 'react';

const Banner = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/banner')
      .then((res) => res.json())
      .then((data) => setBanner(data))
      .catch((err) => console.error("Failed to load banner", err));
  }, []);

  if (!banner) return <div>Loading banner...</div>;

  return (
    <div className="banner">  
      {/* <img src={banner.image} alt="Banner" className="banner-img" /> */}
      
      <img src={`http://localhost:5000${banner.image}`} alt="Banner" className="banner-img" />
      <h2 className="banner-title">{banner.title}</h2>
    </div>
  );
};

export default Banner;
