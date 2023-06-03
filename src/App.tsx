import "./App.css";
import { useState, useEffect, ChangeEvent } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

import { getData } from "./utils/data.utils";

export type Monster = {
  id: string;
  name: string;
  email: string;
};

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setfilterdMonsters] = useState(monsters);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setMonsters(users);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const newfilteredArray = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setfilterdMonsters(newfilteredArray);
  }, [monsters, searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    // console.log(event.target.value)
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters App</h1>

      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor(){
//     super();
//     this.state={
//       monsters:[]  ,
//       searchField:''
//     }
//   }
//   componentDidMount(){
//     fetch('https://jsonplaceholder.typicode.com/users').then(response=>response.json())
//     .then(users=>this.setState(()=>{return {monsters:users}},()=>{console.log(this.state)}))
//   }
//   onSearchChange=(event)=>{
//     console.log(event.target.value)
//     const searchField = event.target.value.toLocaleLowerCase();

//     this.setState(()=>{
//       return {searchField}
//     });
//   }
//   render(){

//     const {monsters,searchField}=this.state;
//       const {onSearchChange} =this;
//     const filteredArray = monsters.filter((monster)=>{
//       return monster.name.toLocaleLowerCase().includes(searchField);

//     });

//     return (

//       <div className="App">
//       <h1 className='app-title'>Monsters App</h1>
//       <SearchBox  onSearchHandler={onSearchChange} placeHolder='Search monsters' className='search-box'/>

//         <CardList monsters={filteredArray}/>
//       </div>
//     );
//   }

// }

export default App;
