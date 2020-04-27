import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './filterbutton.css'

function FilterButton (props) {
    return (
      <>
        <button style={{ textTransform: "capitalize" }} className="filter" value={props.filterName} onClick={props.showMenu}>
          {props.filterName} 
          <FontAwesomeIcon
            style={{marginLeft: "5px"}}
            className={`fa-xs rotate ${props.isShown ? "down" : ""}`}
            icon="chevron-up" 
          />
        </button>
        {props.isShown ? 
          (<div className="filterMenu">
            {props.filters.map(filter => 
              <label key={filter.id}>
                <input 
                  type="checkbox"
                  name={props.filterName}
                  value={filter.name}
                  checked={filter.checked}
                  onChange={props.handleCheckboxChange}/>
                <span style={{ textTransform: "capitalize"}} className="filterName">{filter.name}</span>
              </label>
            )}
          </div>):(null)
        }
      </>
    );
  }

export default FilterButton;