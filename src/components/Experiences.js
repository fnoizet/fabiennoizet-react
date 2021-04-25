import React from 'react';
import '../css/Experiences.css';
import pdf_png from '../img/downloadPDF.png';

class ExperienceItem extends React.Component {
  
  constructor(props) {
    super(props);
    this.openViewer = this.openViewer.bind(this);
  }

  
  openViewer(e) {
    let viewer = document.querySelector('#expViewer');
    viewer.innerHTML = "";
    viewer.innerHTML = e.currentTarget.innerHTML;
    viewer.style = 'border-color: '+this.props.data.color;
    viewer.querySelector(".closeViewer").addEventListener('click', () => {
      viewer.classList.remove('opened');
      viewer.innerHTML = '';
    });
    viewer.classList.add('opened');
    
  }

  render() {
    let data = this.props.data;
    if (!this.props.data.display) {
      return '';
    }

    let style = {
      backgroundImage: 'url(../img/'+ data.companyLogoPath +')',
      backgroundColor: data.bgcolor
    };

    return (
      <div className="experience" data-color={data.bgcolor} data-position="0" onClick={this.openViewer}>
        <div className="expLogo" style={style}></div>
        <div className="experienceInner">
          <div className="closeViewer">X</div>
          <div className="expTitle">
            <span className="company">{data.company}</span>, <span className="place">{data.place}</span> | <span className="job">{data.job}</span>
          </div>
          <div className="expDate">
            <span className="date">{data.date}</span>
          </div>
          <div className="expDesc">
            {data.desc2}<br /><br />
            <div className="tasks">Tâches principales</div>
            <ul>
              {data.tasks.map((el,i) => {
                return <li key={i}>{el}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class Experiences extends React.Component {
  render() {
    return (
      <div className="wrapper experiences" id="exp">
        <div className="wrapperTitle">Expériences <a href="./Fabien%20NOIZET%20CV.pdf" target="_blank" rel="noreferrer" className="pdfCVLink" title="Télécharger le CV"><img src={pdf_png} alt="Télécharger le CV"/></a></div>
        <div className="innerWrapper">
          {this.props.experiences.map((el,index)=>{
            return <ExperienceItem data={el} key={index}/>;
          })}
          <div id="expViewer"></div>
          <div style={{clear:'both'}}></div>
        </div>
      </div>
    );
  }
}

export default Experiences;
