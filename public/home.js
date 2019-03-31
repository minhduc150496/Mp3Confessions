var confessions =  [];

var Confession = React.createClass({
  render() {
    return(
      <div className="single-blog-post mb-100 wow fadeInUp" data-wow-delay="300ms">
        <div className="blog-post-thumb mb-30">
          <iframe
            scrolling="no"
            width="640"
            height="180"
            src={"https://mp3.zing.vn/embed/song/"+this.props.mp3Code+"?start=false"}
            frameBorder="0" allowFullScreen="true"></iframe>
        </div>
        <a href="#" className="post-title">
          From: {this.props.sender}<br/>
          To: {this.props.receiver}
        </a>
        <div className="post-meta d-flex justify-content-between">
          <div className="post-date">
            <p>May 22, 2018</p>
          </div>
        </div>
        <div className="bg-gradients mb-30 w-25"></div>
        <p>{this.props.message}</p>
      </div>
    );
  }
});

var confessionList = null;
var ConfessionList = React.createClass({
  getInitialState() {
    return {confessions: []};
  },
  componentWillMount(){
    confessionList = this;
    $.ajax({
      type: "GET",
      url: "/getConfessions",
      success: function(data) {
        confessionList.setState({confessions: data});
      }
    });
  },
  render() {
    return (
      <div>
      {
        this.state.confessions.map((confession, index) => {
          return(
          <Confession
            key={index}
            sender={confession.sender}
            receiver={confession.receiver}
            message={confession.message}
            mp3Code={confession.mp3Code} />
          );
        })
      }
      </div>
    );
  }
});

ReactDOM.render(
  <ConfessionList />,
  document.getElementById('confessions-list')
);
