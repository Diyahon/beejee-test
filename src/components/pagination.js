import React, { Component } from 'react';

export default class Pagination extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      todosPerPage: 3,
      upperPageBound: 3,
      lowerPageBound: 0,
      isPrevBtnActive: 'disabled',
      isNextBtnActive: '',
      pageBound: 3
    };
    this.handleClick = this.handleClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnNextClick = this.btnNextClick.bind(this);
    this.btnPrevClick = this.btnPrevClick.bind(this);
    this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
  }

  handleClick(event) {
    let listid = Number(event.target.id);
    this.props.changePage(listid);
    this.setState({
      currentPage: listid
    });
    this.setPrevAndNextBtnClass(listid);
  }
  setPrevAndNextBtnClass(listid) {
    let totalPage = Math.ceil(this.props.count / this.state.todosPerPage);
    this.setState({isNextBtnActive: 'disabled'});
    this.setState({isPrevBtnActive: 'disabled'});
    if(totalPage === listid && totalPage > 1){
      this.setState({isPrevBtnActive: ''});
    }
    else if(listid === 1 && totalPage > 1){
      this.setState({isNextBtnActive: ''});
    }
    else if(totalPage > 1){
      this.setState({isNextBtnActive: ''});
      this.setState({isPrevBtnActive: ''});
    }
  }
  btnIncrementClick() {
    this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
    this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
    let listid = this.state.upperPageBound + 1;
    this.props.changePage(listid);
    this.setState({ currentPage: listid});
    this.setPrevAndNextBtnClass(listid);
  }
  btnDecrementClick() {
    this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
    this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
    let listid = this.state.upperPageBound - this.state.pageBound;
    this.props.changePage(listid);
    this.setState({ currentPage: listid});
    this.setPrevAndNextBtnClass(listid);
  }
  btnPrevClick() {
    if((this.state.currentPage -1)%this.state.pageBound === 0 ){
      this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
      this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
    }
    let listid = this.state.currentPage - 1;
    this.props.changePage(listid);
    this.setState({ currentPage : listid});
    this.setPrevAndNextBtnClass(listid);
  }
  btnNextClick() {
    if((this.state.currentPage +1) > this.state.upperPageBound ){
      this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
      this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
    }
    let listid = this.state.currentPage + 1;
    this.props.changePage(listid);
    this.setState({ currentPage : listid});
    this.setPrevAndNextBtnClass(listid);
  }
  render() {
    const { currentPage, todosPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive } = this.state;
    const { count } = this.props;

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(count / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      if(number === 1 && currentPage === 1){
        return(
          <li key={number} className={currentPage === number ? 'active' : ''} id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
        )
      }
      else if((number < upperPageBound + 1) && number > lowerPageBound){
        return(
          <li className={currentPage === number ? 'active' : ''} key={number} id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
        )
      }
    });
    let pageIncrementBtn = null;
    if(pageNumbers.length > upperPageBound){
      pageIncrementBtn = <li className=''><a href='#' onClick={this.btnIncrementClick}> &hellip; </a></li>
    }
    let pageDecrementBtn = null;
    if(lowerPageBound >= 1){
      pageDecrementBtn = <li className=''><a href='#' onClick={this.btnDecrementClick}> &hellip; </a></li>
    }
    let renderPrevBtn = null;
    if(isPrevBtnActive === 'disabled') {
      renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev"> Prev </span></li>
    }
    else{
      renderPrevBtn = <li className={isPrevBtnActive}><a href='#' id="btnPrev" onClick={this.btnPrevClick}> Prev </a></li>
    }
    let renderNextBtn = null;
    if(isNextBtnActive === 'disabled') {
      renderNextBtn = <li className={isNextBtnActive}><span id="btnNext"> Next </span></li>
    }
    else{
      renderNextBtn = <li className={isNextBtnActive}><a href='#' id="btnNext" onClick={this.btnNextClick}> Next </a></li>
    }
    return (
      <div>
        <ul className="pagination">
          {renderPrevBtn}
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          {renderNextBtn}
        </ul>
      </div>
    );
  }
}
