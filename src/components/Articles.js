import React from 'react';
import '../css/Articles.css';

class ArticleItem extends React.Component {
  render() {
    let data = this.props.data;
    if (!this.props.data.display) {
      return '';
    }

    let style = {
      backgroundImage: 'url(../img/' + data.pic + ')',
    };

    return (
      <div className="article" style={{color:'#000'}}>
        <a href={data.url} target={data.targetUrl}>
          <div className="artLogo" style={style}></div>
          <div>{data.name}</div>
        </a>
      </div>
    );
  }
}

class Articles extends React.Component {
  render() {
    return (
      <div className="wrapper articles" id="art">
        <div className="wrapperTitle">Articles et réalisations</div>
        <div className="innerWrapper">
          {this.props.articles.map((el,index)=>{
            return <ArticleItem data={el} key={index}/>;
          })}         
          <div style={{clear:'both'}}></div>
        </div>
      </div>
    );
  }
}

export default Articles;
