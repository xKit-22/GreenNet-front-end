export const geocode = async (coordinates) => {
    const validCoodinates = coordinates.map(item => item.toFixed(7));
    const address = await fetch(`https://catalog.api.2gis.com/3.0/items/geocode?lat=${validCoodinates[1]}&lon=${validCoodinates[0]}&fields=items.point&key=rufdyl7245`)
        .then(response => response.json())
        .then(response => {debugger; return response.result.items[0].full_name});
    return address;
}
//переделать на получение по фильтру
export const getAllMarkers = () => {
    const mockedArray = [
        [46.020084709046934, 51.53352363297714],
        [46.02055677193405, 51.532862906325754],
        [46.02196762415898, 51.533687145026704]
    ];

    return mockedArray;
}