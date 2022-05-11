import React from 'react';

const HomePage = () => (
  <div className="text-center">
    <h1 className="title">Home Page</h1>
    <div className="row justify-content-center">
      <div className="video">
        <iframe
          className="vid"
          src="https://www.youtube.com/embed/zVvR-h0Bpu8"
          frameBorder="0"
          allowFullScreen
          title="video"
        />
      </div>
    </div>
  </div>
);

export default HomePage;
