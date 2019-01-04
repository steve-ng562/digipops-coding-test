import React, { Component } from 'react';



function List(props) {

const listItems = props.items.map((film) => 
	<tr>
	<th scope="row">{film.ID}</th>
	<td>{film.title}</td>
	<td>{film.creator}</td>
	<td>{film.runtime}</td>
	</tr>

      );

return(
<table className = "table">
<thead>
<tr>
<th scope="col">Film ID</th>
      <th scope="col">Title</th>
      <th scope="col">Creator</th>
      <th scope="col">Runtime</th>
</tr>
</thead>
<tbody>

{listItems}
</tbody>
</table>
);
}

  export default List;