
import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test-utils"
import { API_URL } from "../../app/constants";
import Cita from "./Cita";


const data = [
    {
        "quote": "Shut up, brain. I got friends now. I don't need you anymore.",
        "character": "Lisa Simpson",
        "image": "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FLisaSimpson.png?1497567512083",
        "characterDirection": "Right"
    }
]

const renderComponent = () => {
    render(
        <Cita />
    )
}

// SETTINGS 
export const handlers = [
    rest.get(API_URL, (req, res, ctx) => {
        return res(ctx.json(data), ctx.status(200));
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());



// TESTS
describe("Cita", () => {

    beforeEach(() => renderComponent())

    describe("Cuando se renderiza inicialmente el componente", () => {
        test("No deberia mostrar ninguna cita", () => {
            expect(screen.queryByText(/No se encontro ninguna cita/i)).toBeInTheDocument();
        });
        test.skip("Debería mostrar un campo para ingresar nombre de autor", async () => {          
        });
        test.skip("Debería mostrar un botón para obtener cita aleatoria", async () => {           
        });
        test.skip("Debería mostrar un botón para borrar cita / limpiar input", async () => {          
        });

    });

    describe("Cuando no se ingresa data y se obtiene una cita aleatoria exitosamente", () => {
        test.skip("Al hacer click en botón 'Obtener cita aleatoria' debería mostrar una cita aleatoria", async () => {
            await waitFor(() => { });
        });
    });

    describe("Cuando se ingresa un nombre válido y se obtiene una cita exitosamente", () => {
        test.skip("Al ingresar un nombre válido en el input, el botón de 'Obtener cita aleatoria' debería cambiar a 'Obtener cita' ", async () => {
            await waitFor(() => { });
        });
        test.skip("Al hacer click en 'Obtener cita' debería mostrar leyenda 'cargando' mientras obtiene la cita", async () => {
            await waitFor(() => { });
        });

        test.skip("Una vez obtenida la cita (status 200), debería mostrar la cita del autor ingresado", async () => {
            await waitFor(() => { });
        });
    });

    describe("Cuando se ingresa un nombre inválido", () => {
        test.skip("Al ingresar un número, debería mostrar leyenda 'Por favor ingrese un nombre válido'", async () => {
            await waitFor(() => { });
        });
    });

    describe("Cuando se hace click en botón ´Borrar'", () => {
        test.skip("Debería limpiar el input", async () => {
            await waitFor(() => { });
        });
        test.skip("Debería borrar cita/leyenda inválido y mostrar 'No se encontró ninguna cita'", async () => {
            await waitFor(() => { });
        });
    });
});
