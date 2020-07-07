import React from "react"
import { useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()

    const handleFilter = (e) => {
        e.preventDefault()
        const filter = e.target.value
        dispatch(changeFilter(filter))
    }

    return (
        <div>
            Filter: 
            <input name="filter" onChange={handleFilter}/>
        </div>
    )
}

export default Filter