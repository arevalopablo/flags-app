import selects from '../config/select.json'

export function subSelectDecider(select) {
    switch (select) {
        case 'name':
            return selects.name_selects
        default:
            return null   
    }
}

export function returnFiltered(select, searchValue, flags) {
    switch (select) {
        case select:
            return flags.filter((country) => country[select]?.some((option) => option.includes(searchValue.toLowerCase())))
        // case 'languages':
        //     return flags.filter((country) => country.languages.some((option) => option.includes(searchValue.toLowerCase())));
        // case 'currencies':
        //     return flags.filter((country) => country.currencies.some((option) => option.includes(searchValue.toLowerCase())));
        // case 'continents':
        //     return flags.filter((country) => country.continents.some((option) => option.includes(searchValue.toLowerCase())));     
        default:
            return []
    }
}





