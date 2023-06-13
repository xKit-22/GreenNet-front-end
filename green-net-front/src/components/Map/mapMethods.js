export const geocode = async (coordinates) => {
    const validCoodinates = coordinates.map(item => item.toFixed(7));
    const address = await fetch(`https://catalog.api.2gis.com/3.0/items/geocode?lat=${validCoodinates[1]}&lon=${validCoodinates[0]}&fields=items.point&key=rufdyl7245`)
        .then(response => response.json())
        .then(response => response.result.items[0].full_name);
    return address;
}
//переделать на получение по фильтру
export const getAllMarkers = async () => {
    const res = await fetch(`http://localhost:3000/marker`)
        .then(response => response.json())
        .then(response => response);
    return res;
}

export const getMarkerById = async (id) => {
    const marker = await fetch(`http://localhost:3000/marker/${id}`)
        .then(response => response.json())
        .then(response => response);

    return marker;
}