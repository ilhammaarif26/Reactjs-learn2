import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import List from './List';

function Clicker(){
  function handleClikcker(e){
    alert("berhasil diklik");
    e.preventDefault()
  }

  return (
    <a href='#' onClick={handleClikcker}>Klik</a>
  )
}

class Toggle extends Component {
  constructor(props){
    super(props)
    this.state ={
      toggleStatus : true
    }

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    this.setState(state => ({
      toggleStatus : !state.toggleStatus
    }))
  }

  render(){
    return(
      <button onClick={this.handleClick} >
        {this.state.toggleStatus ? 'ON' : 'OFF'}
        <p>Lampu {this.state.toggleStatus ? 'lampu nyala' : 'lampu off'}</p>
      </button>
    )
  }
} 

class Timer extends Component{
  constructor(props){
    super(props)
    this.state = {
      time : props.start
    }
  }

  componentDidMount(){
    this.addInterval = setInterval( () => this.increase(), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.addInterval)
  }

  increase(){
    this.setState((state, props) => ({
      time: parseInt(state.time) + 1
    }));
  }

  render(){
    return (
      <div> {this.state.time} detik </div>
    );
  }
}

function Name(props){
  return <p>{props.nama}</p>
}

function Umur(props){
  return <p>{props.umur}</p>
}

class Api extends Component{
  constructor(props){
    super(props)
    this.state ={
      list : [],
      isLoading : true
    }
  }

  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data =>  this.setState({list : data, isLoading : false}))
  }

  render(){
    const {list, isLoading} = this.state
    
    if(isLoading){
      return <p>Loading......</p>
    }
    return(
      <div>
        <ul>
          {list.map((list, index) => <li key={index}>{list.name}</li>)}
        </ul>
      </div>
    )
  }
}


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todoItem : '',
      item : []
    }
  }

  handleSubimt = (event) => {
    event.preventDefaul()
    this.setState({
    item     :  [...this.state.item, this.state.todoItem],
    todoItem : ''
    })
  }

  handleChange = (event) => {
    this.setState({
      todoItem : event.target.value
    })
  }

  render(){
    return(
      <div>
        <div className="App">
          <header className="App-header">
            
            <Api/>

            <Toggle/>
            <form onSubmit={this.handleSubimt}>
              <input value={this.state.todoItem} onChange={this.handleChange} />
              <button>add</button>
            </form>
            <List item={this.state.item}/>

            <br></br>

          

            <Timer start="0"/>
            <Name nama="ilham" />
            <Umur umur="24" />
            </header>
            <Clicker/>
        </div>
      </div>
    );
  }
}


export default App;
