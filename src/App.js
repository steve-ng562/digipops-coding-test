import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import List from './List';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      total: 50,
      films: [
      {ID:"defaultID", title:"defaultTitle", creator: "defaultCreator", runtime:"defaultRuntime"},
      {ID:"defaultID1", title:"defaultTitle", creator: "defaultCreator", runtime:"defaultRuntime"}
      ],
      currentID: "",
      currentTitle: "",
      currentCreator: "",
      currentRuntime: ""
    }
  }
    
  

  componentDidMount() { 
  
    this.readFilms();
    this.readTotal();
   

    }

    readTotal = () => {
        let currentComponent = this;

    const db = firebase.firestore();
          var totalRef = db.collection("total").doc("total");

      //read total number of films from firestore
    totalRef.get().then(function(doc){
      if(doc.exists) {
        console.log("Document data: ", doc.data());
        currentComponent.setState({
          total: doc.data().total
        })


      }else{
        console.log("No such document!");
      }

      }).catch(function(error) {
    console.log("Error getting document:", error);

    });
    }
  addHandler = () => {
    let currentComponent = this;
    const db = firebase.firestore();
    
    var filmsRef = db.collection("films");

    filmsRef.add({
      title: this.state.currentTitle,
      creator: this.state.currentCreator,
      runtime: this.state.currentRuntime
    }).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
this.readFilms();
this.readTotal();



  }

  deleteHandler = () => {
    const db = firebase.firestore();

    db.collection("films").doc(this.state.currentID).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error)  {

      console.log("Error removing document: " + error);
    });

    this.readFilms();
    this.readTotal();
    }
  

  readFilms = () => {
    let currentComponent = this;
    const db = firebase.firestore();
    var filmsRef = db.collection("films");


    //read data of films from firestore
    filmsRef.get()
    .then(function(querySnapshot) {
      var filmsArr = [];
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
             
            filmsArr.push({
              ID: doc.id, 
              title: doc.data().title,
              creator: doc.data().creator, 
              runtime: doc.data().runtime
            });
            console.log(doc.id, " => ", filmsArr);
        });
        console.log("Film Array: " + filmsArr);
        
        currentComponent.setState({
              films: filmsArr
            });
            
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


  }

  handleTitleChange = (e) => {
    this.setState({
      currentTitle: e.target.value
    });
  }

  handleRuntimeChange = (e) => {
    this.setState({
      currentRuntime: e.target.value
    });
  }

  handleCreatorChange = (e) => {
    this.setState({
      currentCreator: e.target.value
    });
  }

  handleIDChange = (e) => {
    this.setState({
      currentID: e.target.value
    });
  }
  render() {

    return (
      <div className ="App">
      <div className = "container">
      <h1>Digipops Coding Test</h1>
      
      <br></br>
      <div className = "row">
      <div className = "col">
      <h4>Total Number of Films: {this.state.total}</h4>
      </div>
      </div>


      <div className = "row">
        <div className = "col-4">


          
          <p>Enter Film Title: </p>
                    <input type="text" className="form-control" id="filmTitle" onChange={this.handleTitleChange}></input>

                    <p>Enter Film Runtime: </p>
                    <input type="text" className="form-control" id="filmRuntime" onChange={this.handleRuntimeChange}></input>

          <br></br>
      
      
          <button type="button" className="btn btn-primary" onClick={this.addHandler}>Add Film</button>
          <br></br>
        </div>


        <div className = "col-4">
          <p>Enter Film Creator: </p>
                    <input type="text" className="form-control" id="filmCreator" onChange={this.handleCreatorChange}></input>

                    

        </div>
     
        <div className ="col-4">
          <p>Enter film ID to delete: </p>
          <input type="text" className="form-control" id="delete" onChange={this.handleIDChange}></input>
          <br></br>
      
          <button type="button" className="btn btn-danger" onClick={this.deleteHandler}>Delete Film</button>
        </div>

      </div>

      <br></br>

      <div className="row">
        
      <List items={this.state.films}></List>
        
      </div>

      </div>
      </div>
      

    );

  }
}

export default App;
