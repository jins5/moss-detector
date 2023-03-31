function recupererlestexte() {
    
    const fs = require('fs');

    const code1 = document.getElementById("code1").value;
    const code2 = document.getElementById("code2").value;
    

    fs.writeFile('code1.txt', code1, function (err) {
        if (err) throw err;
        console.log('Saved!');
      }
    );
}
