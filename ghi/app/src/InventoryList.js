function InventoryList(props) {
  //add delete later?
  return (
    <>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>VIN</th>
          <th>Color</th>
          <th>Year</th>
          <th>Model</th>
          <th>Manufacturer</th>
        </tr>
      </thead>
      <tbody>
        {props.automobiles.map((auto) =>{
          return (
            <tr key={auto.id}>
              <td>{auto.vin}</td>
              <td>{auto.color}</td>
              <td>{auto.year}</td>
              <td>{auto.model.name}</td>
              <td>{auto.model.manufacturer.name}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  )
}

export default InventoryList;
