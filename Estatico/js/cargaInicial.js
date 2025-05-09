async function cargaInicial() {
    try{
        let res = await fetch("https://examenesutn.vercel.app/api/PersonasFutbolistasProfesionales");
        let json = await res.json();
        let body = document.getElementById("body");
        body.innerHTML=JSON.stringify(json);
    }catch(e){
        console.log(e);
        alert("Algo Fallo");
    }     
}
cargaInicial();