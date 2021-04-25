import '../css/Articles.css';
import React from 'react';

class ArticleViewer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      comp: null
    }

    var name = props.match.params.name;
    try {
      this.state.comp = (require('../Articles/'+name+'.js')).default;
    } catch(e) {
      this.state.comp = (require('../Articles/error.js')).default;
    }
  }

  render() {

    let Comp = this.state.comp;
    return (
      <div>
        <Comp />
      </div>
    );
  }
}

export default ArticleViewer;
