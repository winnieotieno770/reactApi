import React, {useEffect, useState} from 'react';
 
import './App.css';

import Chuck  from './chuck.png'

import axios from 'axios'

function App() {
  const [state, setState] = useState({
    joke:''
  })
  const [query, setQuery] = useState('teeth');

useEffect(()=>{

  fetchData();
  

},[])

const fetchData = async() => {
  const response = await axios.get('https://api.chucknorris.io/jokes/random')
  console.log(response.data.value);
  setState({
    ...state,
    joke:response.data.value
  })
  
}
const getResult = async() => {
  const res = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`)
  console.log(res.data.result)
  setQuery ({
    query:res.data.result
  })
  
}

const handleSearch = (e)=>{
  e.preventDefault();
  getResult();
}


  return (
    <div className='container'>
        <div className="row">
          <div className="col-6">
            <h1 className='title'>CHUCKNORRIS API</h1>
            <img src={Chuck} alt="Chuck Norris"/>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                Search for a word
              </div>
              <div className="card-body">
                <input type='text'/>
              </div>
           
            
            </div>
            <div>
          <button className="btn btn-warning" onClick={fetchData}>Generate Joke</button>
        </div>
          </div>

       <h3 className="subTitle">{state.joke}</h3>
        </div>

        {/* <form onSubmit ={handleSearch}>
                <input type="text"
                    onChange = { e => {setQuery(e.target.value)}; value={query}/>
               <button type='submit'>Search for topic</button>
        </form> */}
    
    </div>
      );
}

export default App;
