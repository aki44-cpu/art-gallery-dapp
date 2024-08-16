const { hex2string, string2hex } = require("./utils");
const ArtController = require("./artController");

const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);

async function handleAdvance(data) {
    const payload = hex2string(data.payload);
    const action = JSON.parse(payload);
    let response;

    if (action.type === "create") {
        response = ArtController.createArtPiece(action.data);
    } else if (action.type === "vote") {
        response = ArtController.voteForArtPiece(action.data.id);
    }

    await sendNotice(response);
}

async function handleInspect(data) {
    const payload = hex2string(data.payload);
    let response;

    if (payload === "list") {
        response = ArtController.getAllArtPieces();
    } else {
        response = ArtController.getArtPiece(payload);
    }

    await sendReport(response);
}

async function sendNotice(response) {
    await fetch(rollup_server + "/notice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: string2hex(JSON.stringify(response)) })
    });
}

async function sendReport(response) {
    await fetch(rollup_server + "/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: string2hex(JSON.stringify(response)) })
    });
}

(async () => {
    while (true) {
        const finish_req = await fetch(rollup_server + "/finish", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "accept" })
        });

        if (finish_req.status !== 202) {
            const rollup_req = await finish_req.json();
            if (rollup_req.request_type === "advance_state") {
                await handleAdvance(rollup_req.data);
            } else if (rollup_req.request_type === "inspect_state") {
                await handleInspect(rollup_req.data);
            }
        }
    }
})();
