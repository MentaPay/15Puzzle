const clickableDivs = document.querySelectorAll('.clickable');
    let selectedDivs = [];

    clickableDivs.forEach(div => {
        //Funcion contenida por cada uno de los divs 'clickable'
        div.addEventListener('click', function(){
            //Mientras el div no se encuentre ya seleccionado
            if (!this.classList.contains('clicked')){
                this.classList.add('clicked');
                selectedDivs.push(this);
                //Detecta si hay ya dos seleccionados
                if (selectedDivs.length == 2){
                    const tempContent = selectedDivs[0].textContent;
                    selectedDivs[0].textContent = selectedDivs[1].textContent;
                    selectedDivs[1].textContent = tempContent;
                    
                    const modificaciones = [...clasesFiltradas(selectedDivs[0]), ...clasesFiltradas(selectedDivs[1])];
                    const modnodupe = [...new Set(modificaciones)];
                    const arraysumas = agregarPrefijo(modnodupe);

                    selectedDivs[0].classList.remove('clicked');
                    selectedDivs[1].classList.remove('clicked');

                    selectedDivs = [];
                    modnodupe.forEach((elemento, index) => {
                        actualizarSuma(elemento, arraysumas[index]);
                    });
                }

            } else {
                this.classList.remove('clicked');
                selectedDivs = selectedDivs.filter(selectedDiv => selectedDiv !== this);
            }
        });
    });

    function actualizarSuma(elementoClase, resultadoClase) 
    {
        const elementos = document.querySelectorAll('.' + elementoClase);
        let suma = 0;
        
        elementos.forEach(elemento => {
            suma += parseInt(elemento.textContent) || 0;  
        });
        
        document.querySelector(resultadoClase).textContent = suma;
        if (suma == 15){
            document.querySelector(resultadoClase).style.background = '#44a589';
            document.querySelector(resultadoClase).style.color = 'white';
        } else {
            document.querySelector(resultadoClase).style.background = 'white';
            document.querySelector(resultadoClase).style.color = 'black';
        }

        }

    function clasesFiltradas(filtrando)
    {
        const element = filtrando;
        const validClasses = ['ro1', 'ro2', 'ro3', 'co1', 'co2', 'co3', 'di1', 'di2'];

        const elementClasses = Array.from(element.classList);

        const filteredClasses = elementClasses.filter(cls => validClasses.includes(cls));

        return filteredClasses;
    }

    function agregarPrefijo(array)
    {
        const prefijo = '.suma';
        return array.map(elemento => prefijo + elemento);
    }