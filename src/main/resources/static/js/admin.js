$(document).ready(() => {
    getDevices();

    $("#deviceform").submit(e => {
        e.preventDefault();
        let devId = $("#device").val();
        selectDevice(devId);
    });
});

selectDevice = device => {
    let postParams = {"device" : device};

    $.post("/adminselect", postParams, data => {
        console.log(data);
    });
}

getDevices = () => {
    $.post("/adminpost", {}, data => {
        console.log(JSON.parse(data));
        let list = JSON.parse(data);
        fillDropdown(list);
    });
}

fillDropdown = list => {
    $.each(list, (i, item) => {
        $("#device").append(new Option(item.name, item.id));
    });
}