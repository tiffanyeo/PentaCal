import { PubSub } from "../../core/store/pubsub";

export class SearchUsersModal extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/CalApp/client/components/searchUsersModal/searchUsersModal.css">

            <div class="modal-backdrop hidden">
                <div class="modal">

                    <div class="modal-header">
                        <h3>Search users</h3>
                        <button class="close-btn">X</button>
                    </div>

                    <input class="search-input" type="text" placeholder="Search user...">

                    <div class="results-container"></div>

                </div>
            </div>
        `;
    }

    connectedCallback() {

        this.backdrop = this.shadowRoot.querySelector(".modal-backdrop");
        this.closeBtn = this.shadowRoot.querySelector(".close-btn");
        this.searchInput = this.shadowRoot.querySelector(".search-input");
        this.resultsContainer = this.shadowRoot.querySelector(".results-container");

        // Open modal (global event)
        this.unsubscribeOpen = PubSub.subscribe("Users::OpenSearchModal", () => {
            this.openModal();
        });

        // Close modal
        this.closeBtn.addEventListener("click", () => this.closeModal());
        this.backdrop.addEventListener("click", e => {
            if (e.target === this.backdrop) this.closeModal();
        });

        // Search input listener
        this.searchInput.addEventListener("input", () => {
            const query = this.searchInput.value.trim();
            this.searchUsers(query);
        });
    }

    disconnectedCallback() {
        if (this.unsubscribeOpen) this.unsubscribeOpen();
    }

    openModal() {
        this.backdrop.classList.remove("hidden");
        this.searchInput.value = "";
        this.resultsContainer.innerHTML = "";
        this.searchInput.focus();
    }

    closeModal() {
        this.backdrop.classList.add("hidden");
    }

    // Fake search 
    searchUsers(query) {

        // Om tom söksträng → visa inget
        if (!query) {
            this.resultsContainer.innerHTML = "";
            return;
        }

        // Dummy data (ersätt med API)
        const dummyUsers = [
            { id: 1, name: "Anna" },
            { id: 2, name: "Björn" },
            { id: 3, name: "Cecilia" },
            { id: 4, name: "David" },
            { id: 5, name: "Elin" }
        ];

        const filtered = dummyUsers.filter(u =>
            u.name.toLowerCase().includes(query.toLowerCase())
        );

        this.renderResults(filtered);
    }

    renderResults(users) {

        this.resultsContainer.innerHTML = "";

        users.forEach(user => {

            const row = document.createElement("div");
            row.classList.add("result-row");
            row.textContent = user.name;

            // Klick på user = publicera event 
            row.addEventListener("click", () => {
                PubSub.publish("Users::UserSelected", user);
                this.closeModal();
            });

            this.resultsContainer.appendChild(row);
        });
    }
}

customElements.define("search-users-modal", SearchUsersModal);