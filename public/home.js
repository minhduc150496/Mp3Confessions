var confessions =  [];

class Confession extends React.Component {
  render() {
    return(
      <div className="single-blog-post mb-100 wow fadeInUp" data-wow-delay="300ms">
        <div className="blog-post-thumb mb-30">
          <iframe
            scrolling="no"
            width="100%"
            height="180"
            src={"https://mp3.zing.vn/embed/song/"+this.props.mp3Code+"?start=false"}
            frameBorder="0" allowFullScreen={true}></iframe>
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
}

var confessionList = null;
class ConfessionList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      confessions: [],
      activePage: 1,
      totalPage: 0,
      pages: [1]
    };
    this.changePage = this.changePage.bind(this);
  }
  componentWillMount(){
    confessionList = this;
    this.getConfessions();
  }
  getConfessions() {
    $.ajax({
      type: "GET",
      url: "/getConfessions",
      data: {
        pageNumber: this.state.activePage
      },
      success: function(data) {
        var pages = [];
        for (var i = 1; i <= data.totalPage; i++) {
          pages.push(i);
        }
        confessionList.setState({
          confessions: data.confessions,
          totalPage: data.totalPage,
          pages: pages
        });
      }
    });
  }
  changePage(pageNumber) {
    this.state.activePage = pageNumber;
    this.getConfessions();
  }
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
        <div className="musica-pagination-area wow fadeInUp" data-wow-delay="700ms">
          <nav>
            <ul className="pagination">
              {
                this.state.pages.map((item, index) => {
                  var active = "";
                  if (item == confessionList.state.activePage) {
                    active = " active";
                  }
                  return (
                    <li key={index} className={"page-item" + active}>
                      <a className="page-link" href="#" onClick={() => this.changePage(item)}>{item}</a>
                    </li>
                  );
                })
              }
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

var writeConfessionDialog = null;
class WriteConfessionDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      mp3Code: "",
      demoMp3Link: "",
      btnSubmitLabel: "Gửi",
      btnSubmitDisabled: false,
      btnCloseDisabled: false,
      btnCancelDisabled: false
    };
    this.handleMp3LinkChange = this.handleMp3LinkChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearAllFields = this.clearAllFields.bind(this);
  }
  clearAllFields() {
    this.refs.txtMp3Link.value = "";
    this.refs.txtFrom.value = "";
    this.refs.txtTo.value = "";
    this.refs.txtMessage.value = "";
    this.setState({
      demoMp3Link: ""
    });
  }
  handleMp3LinkChange() {
    var mp3Code = this.refs.txtMp3Link.value;
    var arr = mp3Code.split("/");
    if (arr.length>0) {
      mp3Code = arr[arr.length-1];
      arr = mp3Code.split(".");
      mp3Code = arr[0];
    } else {
      mp3Code = "";
    }
    var demoMp3Link = "";
    if (mp3Code.length > 0) {
      demoMp3Link = "https://mp3.zing.vn/embed/song/"+mp3Code+"?start=true";
    }
    this.setState({
      demoMp3Link: demoMp3Link,
      mp3Code: mp3Code
    })
  }
  handleSubmit() {
    this.setState({
      btnSubmitLabel: "Đang gửi...",
      btnSubmitDisabled: true,
      btnCloseDisabled: true,
      btnCancelDisabled: true
    });
    const newConfession = {
      mp3Code: this.state.mp3Code,
      sender: this.refs.txtFrom.value,
      receiver: this.refs.txtTo.value,
      message: this.refs.txtMessage.value
    };
    $.ajax({
      type: "POST",
      url: "/writeConfession",
      data: newConfession,
      success: function(response) {
        // update CFS list
        confessionList.state = {
          activePage: 1
        }
        confessionList.getConfessions();
        writeConfessionDialog.setState({
          btnSubmitLabel: "Gửi",
          btnSubmitDisabled: false,
          btnCloseDisabled: false,
          btnCancelDisabled: false
        });
        writeConfessionDialog.clearAllFields();
        $("#write-confession-dialog").modal("hide");
        alertify.notify('Confession của bạn đã được gửi thành công!','custom');
      }
    })
  }
  componentWillMount(){
    writeConfessionDialog = this;
  }
  render() {
    return(
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Viết confession</h5>
            <button type="button" className="close"
              disabled={this.state.btnCloseDisabled}
              data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h2 className="mt-30">Bước 1: Gói ghém giai điệu</h2>
            <p>Vui lòng dán đường dẫn <a target="_blank" href="http://zingmp3.vn">Zing MP3</a> vào đây:</p>
            <div className="input-group mb-3">
              <input type="text" className="form-control" ref="txtMp3Link"
              placeholder="Ví dụ: https://zingmp3.vn/bai-hat/Nay-Em-Le-Thien-Hieu/ZW7B76AF.html"
              aria-label="Username" aria-describedby="basic-addon1"
              onChange={this.handleMp3LinkChange} />
            </div>
            <iframe
              scrolling="no" width="100%" height="180"
              src={this.state.demoMp3Link}
              frameBorder="0" allowFullScreen={true}/>
            <h2 className="mt-50">Bước 2: Nhắn gửi yêu thương</h2>
            <label>From:</label>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Ví dụ: Anh Trai Mưa"
                ref="txtFrom"
                aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <label>To:</label>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Ví dụ: Em Gái Bão Tố"
                ref="txtTo"
                aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <label>Mấy dòng tâm sự:</label>
            <div className="input-group">
              <textarea className="form-control input-message"
              ref="txtMessage"
              placeholder="Ví dụ: Em à. Anh biết giờ này đây. A có nói gì cũng chẳng thể thay đổi được quyết đinh của em phải không. Nhưng anh vẫn muốn nói ra tất cả. Nói ra suy nghĩ trong anh. Một lần cuối cùng và mãi mãi. Trong giây phút này, tâm trí anh rối bời.. Thời gian bên em. Anh đã vô tâm, lạnh nhạt với em. Anh thờ ơ, anh bỏ ngoài tai, anh không quan tâm những lời em nói. Anh đã không quan tâm đến cảm giác của em. Để rồi, những ngày qua. Anh đã sống như 1 kẻ vô hồn khi em yêu người khác. Sự ân hận, nuối tiếc muộn màng. Con tim đau như ai bóp ngẹt. Anh không thể làm chủ bản thân mình. Anh điên dại níu kéo em về bên anh. Hành động theo bản năng của một thằng đàn ông đang dần để tuột mất người con gái mà mình đã yêu hơn tất cả. Nhưng dường như, a càng níu thỳ lại càng đẩy em ra xa anh nhiều hơn." aria-label="With textarea"/>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary"
              disabled={this.state.btnCancelDisabled} onClick={this.clearAllFields}
              data-dismiss="modal">Hủy</button>
            <button type="button" className="btn btn-primary"
              disabled={this.state.btnSubmitDisabled} onClick={this.handleSubmit}>
              {this.state.btnSubmitLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ConfessionList />,
  document.getElementById('confessions-list')
);
ReactDOM.render(
  <WriteConfessionDialog />,
  document.getElementById('write-confession-dialog')
);

alertify.set('notifier','position', 'bottom-left');
