
import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, waitFor, act } from "@testing-library/react";
import { render } from "../../test-utils"
import { API_URL } from "../../app/constants";
import Cita from "./Cita";
import { mockedQuotes } from "./mockedQuotes";
import userEvent from '@testing-library/user-event';


const randomQuote = mockedQuotes[0].data
const validQueries = mockedQuotes.map((q) => q.query)

const renderComponent = () => {
    render(
        <Cita />
    )
}

// SETTINGS 
const handlers = [
    rest.get(`${API_URL}`, (req, res, ctx) => {
        const character = req.url.searchParams.get('character');

        if (character === null) {
            return res(ctx.json([randomQuote]), ctx.delay(150));
        }

        if (validQueries.includes(character)) {
            const quote = mockedQuotes.find((q) => q.query === character);
            return res(ctx.json([quote?.data]));
        }

        return res(ctx.json([]), ctx.delay(150));
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());



// TESTS
describe("Cita", () => {

    beforeEach(() => renderComponent())

    describe("Cuando se renderiza el componente por default", () => {
        test("No deberia mostrar ninguna cita", () => {
            expect(screen.queryByText(/No se encontro ninguna cita/i)).toBeInTheDocument();
        });
        test("Debería mostrar un campo para ingresar nombre de autor", () => {
            const inputAutor = screen.getByLabelText("Author Cita")
            expect(inputAutor).toBeInTheDocument();
        });
        test("Debería mostrar un botón para obtener cita aleatoria", () => {
            const btnCitaAleatoria = screen.getByLabelText("Obtener cita aleatoria")
            expect(btnCitaAleatoria).toBeInTheDocument();
        });
        test("Debería mostrar un botón para borrar cita / limpiar input", () => {
            const btnBorrar = screen.getByRole('button', { name: /borrar/i })
            expect(btnBorrar).toBeInTheDocument();
        });
    });

    describe("Cuando no se ingresa data y se obtiene una cita aleatoria exitosamente", () => {
        test("Al hacer click en botón 'Obtener cita aleatoria' debería mostrar una cita aleatoria", async () => {
            const btnCitaAleatoria = screen.getByRole('button', { name: /Obtener cita aleatoria/i })
            userEvent.click(btnCitaAleatoria)
            await waitFor(() => { expect(screen.getByText(/Lisa Simpson/i)).toBeInTheDocument() });
        });
    });

    describe("Cuando se ingresa un nombre válido y se obtiene una cita exitosamente", () => {

        test("Al ingresar un nombre válido en el input, el botón de 'Obtener cita aleatoria' debería cambiar a 'Obtener cita' ", async () => {
            const inputAutor = screen.getByLabelText("Author Cita")
            userEvent.click(inputAutor)
            userEvent.keyboard('lisa')
            const btnObtenerCita = await screen.findByRole('button', { name: /Obtener Cita/i })
            expect(btnObtenerCita).toBeInTheDocument()
        });
        test("Al hacer click en 'Obtener cita' debería mostrar leyenda 'cargando' mientras obtiene la cita", async () => {
            const btnObtenerCita = await screen.findByRole('button', { name: /Obtener Cita/i })
            userEvent.click(btnObtenerCita)
            await waitFor(() => {
                expect(screen.getByText(/cargando/i)).toBeInTheDocument()
            });
        });
        test("Una vez obtenida la cita (status 200), debería mostrar la cita del autor ingresado", async () => {
            const inputAutor = screen.getByLabelText("Author Cita")
            userEvent.click(inputAutor)
            userEvent.keyboard('lisa')
            const btnObtenerCita = await screen.findByRole('button', { name: /Obtener Cita/i })
            userEvent.click(btnObtenerCita)
            await waitFor(() => {
                expect(screen.getByText(mockedQuotes[0].data.quote)).toBeInTheDocument()
            });
        });
    });

    describe("Cuando se ingresa un dato inválido", () => {
        test("Al ingresar un número, debería mostrar leyenda 'Por favor ingrese un nombre válido'", async () => {
            const inputAutor = screen.getByLabelText("Author Cita")
            userEvent.click(inputAutor)
            userEvent.clear(inputAutor)
            userEvent.keyboard('25')
            const btnObtenerCita = await screen.findByRole('button', { name: /Obtener Cita/i })
            userEvent.click(btnObtenerCita)
            await waitFor(() => {
                expect(screen.queryByText(/por favor ingrese un nombre válido/i)).toBeInTheDocument()
            });
        });
        test("Al ingresar un nombre de personaje inexistente, debería mostrar leyenda 'Por favor ingrese un nombre válido'", async () => {
            const inputAutor = screen.getByLabelText("Author Cita")
            userEvent.click(inputAutor)
            userEvent.clear(inputAutor)
            userEvent.keyboard('elisa')
            const btnObtenerCita = await screen.findByRole('button', { name: /Obtener Cita/i })
            userEvent.click(btnObtenerCita)
            await waitFor(() => {
                expect(screen.queryByText(/por favor ingrese un nombre válido/i)).toBeInTheDocument()
            });
        });
    });

    describe("Cuando se hace click en botón 'Borrar'", () => {
        test("Debería limpiar el input", async () => {
            const inputAutor = screen.getByLabelText("Author Cita")
            userEvent.click(inputAutor)
            userEvent.keyboard('prueba')
            const btnBorrar = screen.getByRole('button', { name: /borrar/i })
            userEvent.click(btnBorrar)
            await waitFor(() => {
                expect(inputAutor).toHaveValue("")
            });
        });
        test("Debería borrar cita/leyenda inválido y mostrar 'No se encontró ninguna cita'", async () => {
            const btnBorrar = screen.getByRole('button', { name: /borrar/i })
            act(() => { userEvent.click(btnBorrar) })
            await waitFor(() => {
                expect(screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocument()
            });
        });
    });
});
