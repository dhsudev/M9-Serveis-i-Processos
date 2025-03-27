class TarjetaCredito {
    #numero;
    #pin;
    #holder;
    #saldo;
    #activo;

    constructor(numero, holder, pin, saldoInicial = 0) {
        this.#numero = numero;
        this.#holder = holder;
        this.#pin = pin;
        this.#saldo = saldoInicial;
        this.#activo = false;
    }

    getSaldo() {
        return this.#saldo;
    }
    getNumero() {
        return this.#numero;
    }

    activar() {
        if (!this.#activo) {
            this.#activo = true;
            console.log(`Tarjeta ${this.#numero} activada.`);
        } else {
            console.log(`Tarjeta ${this.#numero} ya está activa.`);
        }
    }

    anular() {
        if (this.#activo) {
            this.#activo = false;
            console.log(`Tarjeta ${this.#numero} anulada.`);
        } else {
            console.log(`Tarjeta ${this.#numero} ya está inactiva.`);
        }
    }

    pagar(importe, pin, tarjeta) {
        if (!this.#activo) {
            console.log(`No se puede pagar: la tarjeta ${this.#numero} no está activa.`);
            return;
        }
        if(this.#pin !== pin) {
            console.log("PIN incorrecto.");
            return;
        }
        if (importe <= 0) {
            console.log("Importe inválido.");
            return;
        }
        
        // Realizar el pago
        this.#saldo -= importe;
        tarjeta.recibir(importe);
        console.log(`Pago de ${importe} realizado. Saldo actual de consumos: ${this.#saldo}`);
    }

    recibir(importe) {
        this.#saldo += importe;
        console.log(`Ingreso de ${importe} realizado. Saldo actual: ${this.#saldo}`);
    }

    cambiarPin(nuevoPin) {
        if (!/^[0-9]{4}$/.test(nuevoPin)) {
            console.log("El PIN debe ser un número de 4 dígitos.");
            return;
        }
        this.#pin = nuevoPin;
        console.log(`PIN de la tarjeta ${this.#numero} actualizado.`);
    }
}

const tarjeta1 = new TarjetaCredito("1234 5678 9012 3456", "Pepe Pérez", "1234");
const tarjeta2 = new TarjetaCredito("9876 5432 1098 7654", "Juan Gómez", "4321");
const tarjeta3 = new TarjetaCredito("1111 2222 3333 4444", "Ana López", "1111");
tarjeta1.activar();
tarjeta1.pagar(100, "1234", tarjeta2);
tarjeta1.cambiarPin("4321");
tarjeta1.pagar(200, "1234", tarjeta2);
tarjeta1.pagar(300, "4321", tarjeta3);
tarjeta1.anular();
tarjeta1.pagar(100, "4321", tarjeta3);
console.log(tarjeta1.getSaldo());
console.log(tarjeta2.getSaldo());
console.log(tarjeta3.getSaldo());