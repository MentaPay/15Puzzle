
agregarFunciones();

function movimientosPosibles()
{
    const whiteSpaceLocation = document.querySelector('.whiteSpace');
    const posicion = clasesFiltradas(whiteSpaceLocation);
    const textoClase = '.' + posicion.join(".");

    const movimientos = [];
    movimientos.push(textoClase.replace(/(\d+)(\D+)(\d+)/, (match, num1, letras, num2) => {return num1 + letras + (parseInt(num2) + 1)}));
    movimientos.push(textoClase.replace(/(\d+)(\D+)(\d+)/, (match, num1, letras, num2) => {return num1 + letras + (parseInt(num2) - 1)}));
    movimientos.push(textoClase.replace(/\d+/, (num) => parseInt(num) + 1));
    movimientos.push(textoClase.replace(/\d+/, (num) => parseInt(num) - 1));

    return movimientos;
}

function handleClick()
{
    document.querySelector('.whiteSpace').textContent = this.textContent;
    document.querySelector('.whiteSpace').classList.remove('whiteSpace');
    this.classList.remove('clickable');
    this.classList.add('whiteSpace')
    this.textContent = '';
    document.querySelectorAll('.clickable').forEach(element =>{
        element.classList.remove('clickable');
        element.removeEventListener('click', handleClick);
    });
    agregarFunciones();
}

function agregarFunciones(){
    movimientosPosibles().forEach(element => {
        try {
            let elemento = document.querySelector(`${element}`);
            if (elemento && !elemento.classList.contains('clickable')) {
                elemento.classList.add('clickable');
                elemento.addEventListener('click', handleClick);
            }
        } catch (error) {
            console.log(`El elemento ${element} esta fuera de los limites.`);
        }
    });
}

    function clasesFiltradas(filtrando)
    {
        const element = filtrando;
        const validClasses = ['ro1', 'ro2', 'ro3', 'ro4', 'co1', 'co2', 'co3','co4'];

        const elementClasses = Array.from(element.classList);

        const filteredClasses = elementClasses.filter(cls => validClasses.includes(cls));

        return filteredClasses;
    }