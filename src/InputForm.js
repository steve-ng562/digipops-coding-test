import React, { Component } from 'react';



const List = (props) => {(

<ul className="list-group">

props.items.map((item, index) => <li key={index}>{item}</li>)
</ul>
});

  export default List;