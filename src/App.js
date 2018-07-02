import React, { Component } from 'react';
import './App.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import dataNotebooks from './data/notebooks.json';
import dataTablet from './data/Tablets.json';
import nothing from './data/nothing.json';
import mobile from './data/mobile.json';

const selectRowProp = { // for checkboxes in table
  mode: "checkbox",
  clickToSelect: true,
  bgColor: "cadetblue"
};

function headerColumnClassNameFormat() {
  return 'th-string';
}

function rowClassNameFormat() {
  return 'td-column';
}

function columnClassNameFormat() {
  return 'eachcolumn';
}

class Checkbox extends Component{ // component that create checkboxes
  constructor(props) {
    super(props);
    this.state = {checked: {A: false, B:false, C: false}, myData: nothing} // for check changes state in checkboxes
                                                          // and state for data  
    this.handleChange = this.handleChange.bind(this);
  }

  
  handleChange(event) { // to process change
    const value = event.target.value;
    if(value === "1") {
      this.setState({ 
        checked: {A: !this.state.checked.A, B: this.state.checked.B, C: this.state.checked.C}
      });
    } else if(value === "2") {
      this.setState({ 
        checked: {A: this.state.checked.A, B: !this.state.checked.B, C: this.state.checked.C}
      });
    } else if(value === "3") {
      this.setState({ 
        checked: {A: this.state.checked.A, B: this.state.checked.B, C: !this.state.checked.C}
      });
    }
  }

  render() {
      const checkboxes = (
        <div>
            <input type="checkbox" value = {'1'} onClick={this.handleChange} defaultChecked={this.state.checked1}/>
            <span className="chckbx">Notebooks</span> 
            <br />
            <input type="checkbox" value = {'2'} onClick={this.handleChange} defaultChecked={this.state.checked2}/>
            <span className="chckbx">Tablets</span>
            <br />
            <input type="checkbox" value = {'3'} onClick={this.handleChange} defaultChecked={this.state.checked3}/>
            <span className="chckbx">Mobile phones</span>
            <p>{console.log(this.state.checked)}</p>
          </div>
      )
      return (
        <div className = 'App'>
          {checkboxes}  
          <App data={this.state.myData} checkbox= {this.state.checked}/>
        </div>
      );
  }
}

function priceFormatter(cell) {
  return `$${cell}`;
}

function nameFormatter(cell) {
  return `${cell}`;
}

class App extends Component { // component for table

  constructor(props) {
    super(props);
    this.variant = this.variant.bind(this)
  }

  variant() {
    if(this.props.checkbox.A && !this.props.checkbox.B && !this.props.checkbox.C) {
      return dataNotebooks;
    } else if(this.props.checkbox.A && this.props.checkbox.B && !this.props.checkbox.C) {
      return [...dataNotebooks,...dataTablet];
    } else if(this.props.checkbox.A && this.props.checkbox.B && this.props.checkbox.C) {
      return [...dataNotebooks,...dataTablet,...mobile];
    } else if(!this.props.checkbox.A && this.props.checkbox.B && !this.props.checkbox.C) {
      return dataTablet;
    } else if(!this.props.checkbox.A && !this.props.checkbox.B && this.props.checkbox.C) {
      return mobile;
    } else if(!this.props.checkbox.A && this.props.checkbox.B && this.props.checkbox.C) {
      return [...dataTablet,...mobile];
    } else if(this.props.checkbox.A && !this.props.checkbox.B && this.props.checkbox.C) {
      return [...dataNotebooks,...mobile];
    } else return nothing
  }

  render() {
    return (
      <div>
        <BootstrapTable data={ this.variant() } multiColumnSort={ 3 }
          selectRow={selectRowProp}
          tableHeaderClass='my-header-class'
          tableBodyClass='my-body-class'
          tableContainerClass='my-table-container-class'
          headerContainerClass='my-header-container-class'
          trClassName={rowClassNameFormat} >
            <TableHeaderColumn isKey={ true } dataField='name' dataSort={ true } 
            className={ headerColumnClassNameFormat } 
            columnClassName={ columnClassNameFormat }>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField='rating' dataSort={ true } 
            className={ headerColumnClassNameFormat } dataFormat={ nameFormatter } >Rating</TableHeaderColumn>
            <TableHeaderColumn dataField='price' dataSort={ true } 
            className={ headerColumnClassNameFormat }
            filterFormatted dataFormat={ priceFormatter }>Price</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default Checkbox;
