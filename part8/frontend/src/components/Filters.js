import React, {useState, useEffect} from "react"

const Filters = (props) => {
    const [allGenres, setAllGenres] = useState([])

    useEffect(() => {
        const genres = []
        props.books.forEach(b => {
            if (b.genres){
                b.genres.forEach(a => {
                    if (!genres.includes(a)){
                        genres.push(a)
                    }
                })
            }
        })
        setAllGenres(genres)
    }, []) //eslint-disable-line

    const handleClick = (e) => {
        e.preventDefault()
        if (props.filters === e.target.value){
            props.setFilters("")
        } else {
            props.setFilters(e.target.value)
        }

    }

    return (
        <div>
            <form onClick={handleClick}>
                {allGenres.map(genre => {
                    return <button value={genre} key={genre}>{genre}</button>
                })}
            </form>
        </div>
    )
}

export default Filters