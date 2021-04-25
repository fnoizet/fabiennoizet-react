import React from 'react';
import '../css/Description.css';

class Description extends React.Component{
  render() {
    return (
      <div className="wrapper home" id="home">
        <div className="innerWrapper">
          <div className="selfDesc">
            <div className="photoHome"></div>
            <div className="descTags">
              {this.props.tags.map((el, index) => {
                return (<div className="descTag" key={index}>{el}</div>);
              })}
            </div>
            <div className="descText">{this.props.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Description;
