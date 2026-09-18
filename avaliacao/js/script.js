let eventos = [
    {
        id: 1,
        titulo: "Workshop de Git e GitHub",
        tipo: "Workshop",
        data: "2026-09-25",
        local: "Laboratório 2",
        descricao: "Atividade prática sobre versionamento de código.",
        status: "Agendado"
    },
    {
        id: 2,
        titulo: "Palestra sobre Desenvolvimento Web",
        tipo: "Palestra",
        data: "2026-09-28",
        local: "Auditório",
        descricao: "Introdução às principais tecnologias utilizadas na web.",
        status: "Agendado"
    },
    {
        id: 3,
        titulo: "Minicurso de JavaScript",
        tipo: "Minicurso",
        data: "2026-09-10",
        local: "Laboratório 1",
        descricao: "Conceitos de JavaScript, DOM e eventos.",
        status: "Realizado"
    }
];

const app = document.getElementById("app") 
// Navegação 
document.querySelectorAll("[data-view]").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        mostrarTela(this.dataset.view);
    });
});

// Formata a data para o padrão brasileiro.

function formatarData(data) {
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Mostra a tela escolhida sem trocar de página.
function mostrarTela(view) {
    if (view === "dashboard") {
        renderDashboard();
    } else if (view === "novo") {
        renderNovoEvento();
    } else if (view === "eventos") {
        renderEventos();
    }
}


function renderDashboard() {
    const total = eventos.length;
    const agendados = eventos.filter(evento => evento.status === "Agendado").length;
    const realizados = eventos.filter(evento => evento.status === "Realizado").length;

    app.innerHTML = `
        <h1 class="mb-4">Dashboard</h1>
        <div class="row g-3">
            <div class="col-md-4">
                <div class="card dashboard-card p-4">
                    <h5>Total de eventos</h5>
                    <div class="dashboard-number">${total}</div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card dashboard-card p-4">
                    <h5>Eventos agendados</h5>
                    <div class="dashboard-number text-primary">${agendados}</div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card dashboard-card p-4">
                    <h5>Eventos realizados</h5>
                    <div class="dashboard-number text-success">${realizados}</div>
                </div>
            </div>
        </div>
    `;
}

// Formulário de cadastro.
function renderNovoEvento() {
    app.innerHTML = `
        <h1 class="mb-4">Novo Evento</h1>

        <div id="mensagem"></div>

        <form id="formEvento" class="card p-4">
            <div class="mb-3">
                <label for="titulo" class="form-label">Título</label>
                <input type="text" id="titulo" class="form-control" required>
            </div>

            <div class="mb-3">
                <label for="tipo" class="form-label">Tipo</label>
                <select id="tipo" class="form-select" required>
                    <option value="">Selecione</option>
                    <option>Palestra</option>
                    <option>Workshop</option>
                    <option>Minicurso</option>
                    <option>Visita Técnica</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="data" class="form-label">Data</label>
                <input type="date" id="data" class="form-control" required>
            </div>

            <div class="mb-3">
                <label for="local" class="form-label">Local</label>
                <input type="text" id="local" class="form-control" required>
            </div>

            <div class="mb-3">
                <label for="descricao" class="form-label">Descrição</label>
                <textarea id="descricao" class="form-control" rows="4" required></textarea>
            </div>

            <button type="submit" class="btn btn-primary">Cadastrar</button>
        </form>
    `;

    document.getElementById("formEvento").addEventListener("submit", cadastrarEvento);
}


// Cadastra um novo evento.
function cadastrarEvento(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const tipo = document.getElementById("tipo").value;
    const data = document.getElementById("data").value;
    const local = document.getElementById("local").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const mensagem = document.getElementById("mensagem");

    if (!titulo || !tipo || !data || !local || !descricao) {
        mensagem.innerHTML = `<div class="alert alert-danger">Preencha todos os campos obrigatórios.</div>`;
        return;
    }

    const novoId = eventos.length > 0
        ? Math.max(...eventos.map(evento => evento.id)) + 1
        : 1;

    eventos.push({
        id: novoId,
        titulo,
        tipo,
        data,
        local,
        descricao,
        status: "Agendado"
    });

    document.getElementById("formEvento").reset();
    mensagem.innerHTML = `<div class="alert alert-success">Evento cadastrado com sucesso!</div>`;
}

// Cria  a listagem
function renderEventos() {
    app.innerHTML = `
        <h1 class="mb-4">Eventos</h1>

        <div class="row g-2 mb-4">
            <div class="col-md-8">
                <input type="text" id="pesquisa" class="form-control" placeholder="Pesquisar pelo título...">
            </div>
            <div class="col-md-4">
                <select id="filtroStatus" class="form-select">
                    <option value="Todos">Todos</option>
                    <option value="Agendado">Agendado</option>
                    <option value="Realizado">Realizado</option>
                </select>
            </div>
        </div>

        <div id="listaEventos" class="row g-3"></div>
    `;

    document.getElementById("pesquisa").addEventListener("input", atualizarLista);
    document.getElementById("filtroStatus").addEventListener("change", atualizarLista);

    atualizarLista();
}





