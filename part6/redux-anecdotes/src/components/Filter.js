import React from "react"
import { connect } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = (props) => {

    const handleFilter = (e) => {
        e.preventDefault()
        const filter = e.target.value
        props.changeFilter(filter)
    }

    return (
        <div>
            Filter: 
            <input name="filter" onChange={handleFilter}/>
        </div>
    )
}

const mapDispatchToProps = {
    changeFilter
}

const ConnectedFilter = connect(
    null,
    mapDispatchToProps
)(Filter)
export default ConnectedFilter