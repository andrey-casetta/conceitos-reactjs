import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);
  /**
   * Listar os repositórios da sua API:
   * Deve ser capaz de criar uma lista com o campo title de todos os
   * repositórios que estão cadastrados na sua API.
   */

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepos(response.data);
    });
  }, []);

  /**
   * Adicionar um repositório a sua API:
   * Deve ser capaz de adicionar um novo item na sua API através
   * de um botão com o texto Adicionar e, após a criação,
   * deve ser capaz de exibir o nome dele após o cadastro.
   */
  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Repositorio ${Date.now()}`,
      url: "http://github.com/new-repo",
      techs: ["NodeJS", "VueJS", "Angular5"],
    });
    const repo = response.data;
    setRepos([...repos, repo]);
  }

  /**
   * Remover um repositório da sua API: Para cada item da sua lista,
   * deve possuir um botão com o texto Remover que,
   * ao clicar, irá chamar uma função para remover esse item da lista do seu frontend e da sua API.
   */
  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repo = repos.find((repo) => repo.id === id);
    repos.splice(repo,1);
    setRepos([...repos]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
