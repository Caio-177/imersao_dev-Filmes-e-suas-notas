document.addEventListener('DOMContentLoaded', () => {

    // Função para exibir uma lista de filmes na tela
    function displayMovies(movies) {
        movieContainer.innerHTML = ''; // Limpa o container antes de adicionar novos filmes
        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            movieContainer.appendChild(movieCard);
        });
    }

    // Função para carregar os filmes e configurar a página
    async function initialize() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allMovies = await response.json();

            displayMovies(allMovies); // Exibe todos os filmes inicialmente

        } catch (error) {
            console.error("Não foi possível carregar os filmes:", error);
            movieContainer.innerHTML = '<p>Erro ao carregar os filmes. Tente novamente mais tarde.</p>';
        }
    }

    // Função para lidar com a busca (chamada pelo onclick do botão)
    window.realizarBusca = function() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            const filteredMovies = allMovies.filter(movie =>
                movie.nome.toLowerCase().includes(searchTerm)
            );
            displayMovies(filteredMovies);
        } else {
            displayMovies(allMovies); // Se a busca estiver vazia, mostra todos os filmes
        }
    }

    let allMovies = []; // Variável para armazenar todos os filmes
    const movieContainer = document.querySelector('.card-container'); // Onde os filmes são exibidos
    const searchInput = document.querySelector('header input'); // O campo de busca

    // Função para criar o card de um filme
    function createMovieCard(movie) {
        const article = document.createElement('article');

        article.innerHTML = `
            <img src="${movie.poster}" alt="Pôster de ${movie.nome}" class="poster-filme">
            <h2>${movie.nome} (${movie.ano})</h2>
            <p><strong>Nota IMDb:</strong> ${movie.nota_imdb} | <strong>Gênero:</strong> ${movie.genero ? movie.genero.join(', ') : 'Não informado'}</p>
            <p>${movie.sinopse}</p>
            <a href="${movie.link}" target="_blank">Ver no IMDb</a>
            <button class="botao-sobre" onclick="mostrarSobre(this)">Sobre o filme</button>
            <div class="sobre-texto" style="display: none;">
                <p>${movie.sobre}</p>
            </div>
        `;
        return article;
    }

    // Função para mostrar/ocultar a seção "Sobre"
    window.mostrarSobre = function(button) {
        const sobreDiv = button.nextElementSibling;
        if (sobreDiv.style.display === 'none') {
            sobreDiv.style.display = 'block';
            button.textContent = 'Ocultar Sobre';
        } else {
            sobreDiv.style.display = 'none';
            button.textContent = 'Sobre o Filme';
        }
    }

    // Inicia o carregamento dos dados
    initialize();
});