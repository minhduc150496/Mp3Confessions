var confessions =  [];

var Confession = React.createClass({
  render() {
    return(
      <div>
      <iframe
      scrolling="no" width="680" height="180"
      src={"https://mp3.zing.vn/embed/song/"+this.props.mp3Code+"?start=false"}
      frameborder="0"
      allowfullscreen="false"></iframe>
      <p>From: {this.props.sender}</p>
      <p>To: {this.props.receiver}</p>
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
  document.getElementById('root')
);
