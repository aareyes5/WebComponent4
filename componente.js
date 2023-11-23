

class MovableImage extends HTMLElement {
    constructor() {
        super();

        // Adjunta el shadow DOM
        this.attachShadow({ mode: 'open' });

        // Crea la imagen dentro del shadow DOM
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    top: 50%;
                    left: 0;
                    transform: translate(-50%, -50%);
                    transition: left 0.5s ease-in-out;
                }
            </style>
            <img src="carrito.jpg" alt="Imagen Móvil">
        `;
    }

    moveImage() {
        const isMovingRight = this.style.left !== 'calc(100% - 50px)';

        if (isMovingRight) {
            this.style.left = 'calc(100% - 50px)';
        } else {
            this.style.left = '0';
        }
    }
}

// Define el nuevo elemento personalizado
customElements.define('movable-image', MovableImage);

class RotateButton extends HTMLElement {
    constructor() {
        super();
        this.rotationCount = 0;

        // Adjunta el shadow DOM
        this.attachShadow({ mode: 'open' });

        // Crea el botón dentro del shadow DOM
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                }

                .rotate-button {
                    width: 100px;
                    height: 50px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: transform 0.5s ease, background-color 0.5s ease;
                    background-color: #3498db; /* Cambia el color del botón según tus preferencias */
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                }
            </style>
            <button class="rotate-button">Girar</button>
        `;

        // Agrega el evento de clic al botón
        this.shadowRoot.querySelector('.rotate-button').addEventListener('click', () => this.rotateButton());
    }

    rotateButton() {
        this.rotationCount += 1;

        // Calcula el ángulo de rotación (360 grados por cada clic)
        const rotationAngle = this.rotationCount * 360;

        // Aplica la transformación al botón
        this.shadowRoot.querySelector('.rotate-button').style.transform = `rotate(${rotationAngle}deg)`;

        // Emite un evento personalizado llamado 'rotate-click'
        this.dispatchEvent(new CustomEvent('rotate-click'));
    }
}

// Define el nuevo elemento personalizado
customElements.define('rotate-button', RotateButton);