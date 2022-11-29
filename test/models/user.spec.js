import user from '../../controllers/userControllers'

const User = user

// Declara o teste.
describe('user', () => {
	beforeEach(() => {
		// Utilizado para configurações.
		// Ex: Limpar registros do banco de dados.
		// Será executado antes de todas as funções "it"
	})

	test("Retorna todos", () => {
		// Vai retornar um método estático que vai retornar 10 itens.
		let users = User.list()

        console.log(users.length)

		// Espera-se que a quantidade venha 10.
		expect(users.length).toEqual(9)
	})

	/*test("Valida propriedades de um cliente", () => {
		// Vai retornar um metodo estático com o primeiro cliente.
		let cliente = User.read()

		// A propriedade id tem que existir.
		expect(cliente.id).not.toBeUndefined()
		// A propriedade nome tem que existir.
		expect(cliente.nome).not.toBeUndefined()
		// A propriedade telefone tem que existir.
		expect(cliente.telefone).not.toBeUndefined()
	})

	test("Nome do cliente Upercase", () => {
		// Vai retornar um metodo estático com o primeiro cliente.
		let cliente = User.primeiro()

		cliente.nome = "Luan"

		expect(cliente.nomeUpercase()).toEqual("LUAN")
	})

	test("Verificar se o nome contém \"L\".", () => {
		// Vai retornar um metodo estático com o primeiro cliente.
		let cliente = User.primeiro()

		cliente.nome = "Luan"

		expect(cliente.nome.indexOf("L") != -1).toEqual(true)
	})*/
})