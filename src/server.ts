import fastify from "fastify";
import cors from "@fastify/cors";
import { DriverParams } from "./interface/DriverParams";

const server = fastify({ logger: true });

server.register(cors, {
    origin: "*",
    methods: ["GET"],
});

const teams = [
    {
        id: 1,
        name: "Ferrari",
        base: "United kingdom",
    },
    {
        id: 2,
        name: "MC Laren",
        base: "United kingdom",
    },
    {
        id: 3,
        name: "Red Bull Racing",
        base: "United kingdom",
    },
];

const drivers = [
    {
        id: 1,
        name: "Max Verstappen",
        team: "Red Bull racing",
    },
    {
        id: 2,
        name: "Airton Sena",
        team: "Ferrari",
    },
];

server.get("/teams", async (request, response) => {
    response.type("application/json").code(200);

    return { teams };
});

server.get("/drivers", async (request, response) => {
    response.type("application/json").code(200);

    return { drivers };
});

server.get<{ Params: DriverParams }>(
    "/drivers/:id",
    async (request, response) => {
        const id = parseInt(request.params.id);
        const driver = drivers.find((d) => d.id === id);

        if (!driver) {
            response.type("application/json").code(404);
            return { message: "Driver not found" };
        } else {
            response.type("application/json").code(200);
            return { driver };
        }
    }
);

server.listen({ port: 3333 }, () => {
    console.log("Server iniciado");
});
