import React from 'react';
import ClassCard from './class-card';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classCards: [1, 1, 1, 1, 1, 1]
    };
  }

  getClasses() {
    // fetch call to the backend to retrieve all classes and populate the screen
    // with class cards containing their info
    // For now load several cards with dummy data
  }

  componentDidMount() {
    this.getClasses();
  }

  render() {
    return (
      <>
        <div className="class-card-container">
          {this.state.classCards.map((element, index) => {
            return (
              <ClassCard key={index}
                shortDescription={'placeholder'}
                time={'placeholder'}
                imagePath={'placeholder'} />
            );
          })}
        </div>
      </>
    );
  }
}
