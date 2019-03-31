var CreateForm = React.createClass({
  submit() {
    const params = {
      mp3Code: this.refs.txtMp3Code.value,
      sender: this.refs.txtFrom.value,
      receiver: this.refs.txtTo.value,
      message: this.refs.txtMessage.value
    };
    $.ajax({
      type: "POST",
      url: "/createConfession",
      data: params,
      success: function(response) {
        alert("Bạn đã gửi thành công!");
      }
    })
  },
  render() {
    return(
      <div>
      <table>
      <tbody>
      <tr>
      <td>Mp3 Code:</td>
      <td><input type="text" ref="txtMp3Code" /></td>
      </tr>
      <tr>
      <td>From:</td>
      <td><input type="text" ref="txtFrom" /></td>
      </tr>
      <tr>
      <td>To:</td>
      <td><input type="text" ref="txtTo" /></td>
      </tr>
      <tr>
      <td>Message:</td>
      <td><textarea ref="txtMessage" /></td>
      </tr>
      </tbody>
      </table>
      <div style={{textAlign: "center"}}>
      <button onClick={this.submit}>Gửi</button>
      </div>
      </div>
    );
  }
});

ReactDOM.render(
  <CreateForm />,
  document.getElementById('root')
);
