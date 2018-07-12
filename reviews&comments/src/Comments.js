import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";
import $ from "jquery";
import _ from "lodash";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.state = { editing: false };
  }

  edit() {
    this.setState({ editing: true });
  }

  save() {
    console.log("here ",this.newText.value);
    var newText = this.newText.value;
    this.props.updateCommentFromBoard(newText, this.props.index);
    this.setState({ editing: false });
  }

  remove() {
    this.props.removeCommentFromBoard(this.props.index);
  }

  renderNormalMode() {
    return (
      <div className="commentContainer">
        <div className="commentText">{this.props.children}</div>
        <button onClick={this.edit} className="btn btn-comment">
          <span className="fa fa-pencil fa-2x">Edit</span>
        </button>
        <button onClick={this.remove} className="btn btn-comment">
          <span className="fa fa-trash fa-2x">Remove</span>
        </button>
      </div>
    );
  }

  renderEditingMode() {
    return (
      <div className="commentContainer">
        <div className="commentText">
          <textarea
            ref={input => {
              this.newText = input;
            }}
            // onChange={this.handleChange}
            defaultValue={this.props.children}
          />
        </div>
        <button onClick={this.save} className="btn-comment">Save
          <span className="fa fa-floppy-o fa-2x" />
        </button>
      </div>
    );
  }

  render() {
    if (this.state.editing) {
      return this.renderEditingMode();
    } else {
      return this.renderNormalMode();
    }
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.displayComments = this.displayComments.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.addNewComment = this.addNewComment.bind(this);
    this.state = { comments: [] };
  }

  removeComment(idx) {
    var arr = this.state.comments;
    arr.splice(idx, 1);
    this.setState({ comments: arr });
  }

  updateComment(newText, idx) {
    var arr = this.state.comments;
    arr[idx] = newText;
    this.setState({ comments: arr });
  }

  addNewComment() {
    var newText = $("#shareCommentText").val();
    if (newText !== "") {
      var arr = this.state.comments;
      var comment = _.findIndex(arr, function(o) { return o == newText; });      
      console.log(comment)
      if(comment == -1 ){
        arr.push(newText);
        this.setState({ comments: arr });
      }else{
        alert("Already ") 
      }            
    } else alert("Please write a comment to share!");
  }

  displayComments(text, i) {
    console.log(this.removeComment);
    return (
      <Comment
        key={i}
        index={i}
        removeCommentFromBoard={this.removeComment}
        updateCommentFromBoard={this.updateComment}
      >
        {text}
      </Comment>
    );
  }
  render() {
    return (
      <div className="board">
        <div className="shareCommentContainer">
          <textarea id="shareCommentText" placeholder="Write a comment.." />
          <button onClick={this.addNewComment} className="btn btn-success">
            {" "}
            Share
          </button>
        </div>

        {this.state.comments.map(this.displayComments)}
      </div>
    );
  }
}

//  ReactDOM.render(
//    <Board/>,
//    document.getElementById('root')
//  );
export default Board;
