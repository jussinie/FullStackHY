import React from 'react'

const Person = ({person, deletePerson}) => {
    console.log('props for deletePerson', {deletePerson})
    return (
        <>
            <p key={person.id}>{person.name} {person.number}
            <button 
                onClick={() => 
                    deletePerson(person.id, person.name)
                }>delete</button>
            </p>
        </>
    )
}

export default Person