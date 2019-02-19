function autocomplete(input, latInput, lngInput) {
    if(!input) return;
    var dropdown = new google.maps.places.Autocomplete(input);
    dropdown.addListener('place_changed', () => {
        var place = dropdown.getPlace();
        latInput.value = place.geometry.location.lat();
        lngInput.value = place.geometry.location.lng();
    })
    // console.log(input, latInput, lngInput);
    input.on('kedown', (e) => {
        if (e.keyCode === 13) e.preventDefault();
    });
}

export default autocomplete;