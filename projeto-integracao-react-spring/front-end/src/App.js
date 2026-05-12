import { useEffect, useState } from "react";
import "./App.css";

const initialForm = { cep: "", rua: "", bairro: "", cidade: "" };

function App() {
  const [form, setForm] = useState(initialForm);
  const [addresses, setAddresses] = useState([]);
  const [message, setMessage] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    listAddresses();
    loadCount();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  async function listAddresses() {
    const response = await fetch("/address");
    const data = await response.json();
    setAddresses(data);
  }

  async function loadCount() {
    const response = await fetch("/address/count");
    const data = await response.json();
    setTotal(data.total);
  }

  async function createAddress() {
    await fetch("/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setMessage("Endereço cadastrado.");
    setForm(initialForm);
    listAddresses();
    loadCount();
  }

  async function deleteAddress() {
    const response = await fetch(`/address/${form.cep}`, { method: "DELETE" });
    if (response.status === 404) {
      setMessage("Endereço não encontrado!");
      return;
    }
    setMessage("Endereço removido!");
    setForm(initialForm);
    listAddresses();
    loadCount();
  }

  async function findByCep() {
    const response = await fetch(`/address/${form.cep}`);
    if (response.status === 404) {
      setMessage("Endereço não encontrado!");
      return;
    }
    const data = await response.json();
    setForm(data);
    setMessage("Endereço localizado.");
  }

  async function updateAddress() {
    const response = await fetch(`/address/${form.cep}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rua: form.rua,
        bairro: form.bairro,
        cidade: form.cidade,
      }),
    });
    if (response.status === 404) {
      setMessage("Endereço não encontrado.");
      return;
    }
    setMessage("Endereço atualizado.");
    listAddresses();
  }

  async function findByCidade() {
    const response = await fetch(`/address/cidade/${searchCity}`);
    const data = await response.json();
    setAddresses(data);
    setMessage(
      data.length === 0
        ? "Nenhum endereço encontrado nessa cidade."
        : `${data.length} endereço(s) encontrado(s).`
    );
  }

  function resetList() {
    setSearchCity("");
    setMessage("");
    listAddresses();
  }

  return (
    <div className="container">
      <h1>Cadastro de Endereços</h1>
      <p className="total">Total cadastrados: {total}</p>

      <input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />
      <input name="rua" placeholder="Rua" value={form.rua} onChange={handleChange} />
      <input name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} />
      <input name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} />

      <div className="buttons">
        <button onClick={findByCep}>Buscar por CEP</button>
        <button onClick={updateAddress}>Atualizar</button>
        <button onClick={createAddress}>Cadastrar</button>
        <button onClick={deleteAddress}>Remover</button>
      </div>

      <hr />

      <h2>Buscar por cidade</h2>
      <input
        placeholder="Cidade"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />
      <div className="buttons">
        <button onClick={findByCidade}>Buscar cidade</button>
        <button onClick={resetList}>Mostrar todos</button>
      </div>

      {message && <p className="message">{message}</p>}

      <table>
        <thead>
          <tr>
            <th>CEP</th>
            <th>Rua</th>
            <th>Bairro</th>
            <th>Cidade</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((a) => (
            <tr key={a.cep}>
              <td>{a.cep}</td>
              <td>{a.rua}</td>
              <td>{a.bairro}</td>
              <td>{a.cidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;