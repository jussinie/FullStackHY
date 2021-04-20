import React from 'react'

const FilterForm = ({handleFilter}) => {
    return (
      <div>
      filter shown with <input 
      onChange={handleFilter}
      />
    </div>
    )
  }

export default FilterForm