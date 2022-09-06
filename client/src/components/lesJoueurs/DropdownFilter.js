import { useEffect, useState } from "react";
import '../../css/components/dropdownfilter.css'

function Filter({sonRef, nameFilter, id, columnFilterInDB, selectedDropdownValue, contentDropdown, filters, setFilters}) {
    const [openedFilter, setOpenedFilter] = useState('')

    useEffect(() => {
        const handleClickOutside = e => {
            if (!sonRef.current.contains(e.target)) {
                setOpenedFilter('')
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openedFilter])

    return (
        <div ref={sonRef} className="filterClub border" onClick={() => setOpenedFilter(nameFilter)}>
            <div className="text-center">
                <span className="form-text filterText"><i>Filtrer par {nameFilter}</i></span>
                <p className="filterClub-club">{selectedDropdownValue}</p>
            </div>

            {(openedFilter === nameFilter) ? (
                <ul className="listClubs">
                    <li onClick={() => setFilters({ ...filters, [id]: 'all', [nameFilter]: 'Afficher TOUT'})}>Afficher TOUT</li>
                    <hr />
                    {(contentDropdown.length > 0) ? (
                        contentDropdown.map((leDonnee, key) => (<li key={key} onClick={() => setFilters({ ...filters, [id]: leDonnee.id, [nameFilter]: leDonnee[columnFilterInDB]})}>{leDonnee[columnFilterInDB]}</li>))
                    ) : 'Aucun'}
                </ul>
            ) : ''}
        </div>
    )
}

export default Filter