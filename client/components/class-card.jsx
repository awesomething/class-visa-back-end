import React from 'react';

const dummyData = {
  shortDescription: 'This is a test card, thank you for viewing',
  time: 'YYYY-MM-DD hh:mm:ss',
  imagePath: 'https://cdn.shopify.com/s/files/1/1685/2975/products/Average_Joes_Detail.jpg?v=1505914264'
};

export default function ClassCard(props) {
  return (
    <div className="class-card" onClick={() => { alert('Open a page for longer description'); }}>
      <img className="class-card-image" src={dummyData.imagePath} alt="Some Test Alt Text. Maybe should be shortDescription"/>
      <div className="info">
        <div className="description"><h4>{dummyData.shortDescription}</h4></div>
        <div className="time"><h5>Time: {dummyData.time}</h5></div>
      </div>
    </div>
  );
}
