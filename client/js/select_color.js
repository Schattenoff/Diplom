function update(){
    const selector = document.getElementById('select-color');
    switch(selector.options[selector.selectedIndex].value){
        case "0":
            document.documentElement.style.setProperty('--color-theme','#81C0CB');
            break;
        case "1":
            document.documentElement.style.setProperty('--color-theme','#808080');
            break;
        case "2":
            document.documentElement.style.setProperty('--color-theme','#dad300d5');
            break;
    }
}

