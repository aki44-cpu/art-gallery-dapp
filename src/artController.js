const { ethers } = require("ethers");

class ArtController {
    constructor() {
        this.artPieces = {};
    }

    createArtPiece({ creator, title, description, uri }) {
        const id = ethers.utils.id(title + creator);
        this.artPieces[id] = {
            creator,
            title,
            description,
            uri,
            votes: 0
        };
        return { id, ...this.artPieces[id] };
    }

    voteForArtPiece(id) {
        if (!this.artPieces[id]) {
            return { error: "Art piece not found." };
        }
        this.artPieces[id].votes += 1;
        return this.artPieces[id];
    }

    getArtPiece(id) {
        return this.artPieces[id] || { error: "Art piece not found." };
    }

    getAllArtPieces() {
        return Object.values(this.artPieces);
    }
}

module.exports = new ArtController();
