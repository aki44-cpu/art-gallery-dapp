# **Art Gallery Voting DApp**

## **Overview**

The Art Gallery Voting DApp is a decentralized application that allows users to submit and vote on various art pieces. Built on Cartesi Rollups, the platform ensures secure, transparent, and decentralized interactions, providing a tamper-proof way to curate art collections based on community preferences.

---

## **Key Features**

- 🎨 **Submit Art Pieces:** Users can contribute to the gallery by submitting art with a title, description, and URI (e.g., a link to an image or digital art file).
  
- 👍 **Vote for Art:** The community can cast votes for their favorite pieces, contributing to a democratic selection process.
  
- 📜 **List Art Pieces:** View a comprehensive list of all submitted art, along with their current vote tallies.
  
- 🔍 **Inspect Specific Art:** Drill down into specific submissions to see detailed information and the number of votes received.

---

## **Getting Started**

### **Prerequisites**

To run this dApp, ensure you have the following installed on your machine:

- **Node.js** (v14.x or later)
- **Yarn** or **npm**
- **Cartesi Rollups** (configured on your local machine)

### **Installation Steps**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/aki44-cpu/art-gallery-dapp
   cd art-gallery-dapp
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

---

## **Usage**

### **Build the DApp**

Before starting the application, you need to bundle the code:

```bash
cartesi build
```

### **Start the DApp**

Start the DApp by connecting it to the Cartesi Rollups HTTP server:

```bash
ROLLUP_HTTP_SERVER_URL="http://127.0.0.1:5004" cartesi run
```

This command launches the application and connects it to the Cartesi Rollups environment, enabling blockchain interactions.

---

## **Interacting with the DApp**

### **1. Submit an Art Piece**

To submit a new art piece, send a payload with the `type` set to `create` and include the `title`, `description`, and `uri` in the data:

```json
{
  "type": "create",
  "data": {
    "title": "Starry Night",
    "description": "A masterpiece by Vincent van Gogh.",
    "uri": "https://link-to-artwork.com/starry-night.jpg"
  }
}
```

### **2. Vote for an Art Piece**

To vote for an art piece, send a payload with the `type` set to `vote` and include the `id` of the art piece:

```json
{
  "type": "vote",
  "data": {
    "id": "art-piece-id"
  }
}
```

### **3. List All Art Pieces**

To view all submitted art pieces, send an inspect request with the route `list`:

```json
{
  "inspect_route": "list"
}
```

### **4. Inspect a Specific Art Piece**

To inspect details of a specific art piece, send an inspect request with the `id` of the art piece:

```json
{
  "inspect_route": "art-piece-id"
}
```

---

## **Project Structure**

```plaintext
art-gallery-dapp/
│
├── src/
│   ├── index.js            # Main entry point, handles Rollup interactions
│   ├── controller.js       # Handles art submission and voting logic
│   ├── model.js            # Art model with in-memory storage
│   └── utils.js            # Utility functions for hex-string conversion
│
├── dist/                   # Compiled output
│
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## **About**

This DApp leverages **Cartesi Rollups** to securely manage the submission and voting of art pieces on the blockchain. By using Rollups, the application can scale while maintaining security and transparency, ensuring a decentralized and fair art curation process.

**Happy Voting! 🎉**