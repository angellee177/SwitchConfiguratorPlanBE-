import swaggerJsdoc from "swagger-jsdoc";

/** Shared envelope and entity shapes — kept in code so Docker (dist-only) still serves a full spec. */
const components = {
  schemas: {
    ErrorResponse: {
      type: "object",
      properties: {
        success: { type: "boolean", example: false },
        message: { type: "string" },
        error: {
          description: "Error detail (string message or structured payload)",
          nullable: true,
        },
      },
      required: ["success", "message"],
    },
    SwitchPlateStyle: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        code: { type: "string" },
        supportsCustomColours: { type: "boolean" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
        deletedAt: { type: "string", format: "date-time", nullable: true },
      },
    },
    SwitchPlateColour: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        code: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
        deletedAt: { type: "string", format: "date-time", nullable: true },
      },
    },
    SwitchPlateOrientation: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        code: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
        deletedAt: { type: "string", format: "date-time", nullable: true },
      },
    },
    SwitchPlateMech: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        code: { type: "string" },
        supportsColour: { type: "boolean" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
        deletedAt: { type: "string", format: "date-time", nullable: true },
      },
    },
    ColourRef: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        code: { type: "string" },
      },
    },
    SwitchPlateColourCombination: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        code: { type: "string" },
        backplateColour: { $ref: "#/components/schemas/ColourRef" },
        faceplateColour: { $ref: "#/components/schemas/ColourRef" },
        mechColour: { $ref: "#/components/schemas/ColourRef" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
        deletedAt: { type: "string", format: "date-time", nullable: true },
      },
    },
    SwitchPlateStyleSummary: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        code: { type: "string" },
        supportsCustomColours: { type: "boolean" },
      },
    },
    SwitchPlateStyleColourCombination: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        style: { $ref: "#/components/schemas/SwitchPlateStyleSummary" },
        colourCombination: { $ref: "#/components/schemas/SwitchPlateColourCombination" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
        deletedAt: { type: "string", format: "date-time", nullable: true },
      },
    },
    FullSwitchPlateConfig: {
      type: "object",
      properties: {
        styles: { type: "array", items: { $ref: "#/components/schemas/SwitchPlateStyle" } },
        colours: { type: "array", items: { $ref: "#/components/schemas/SwitchPlateColour" } },
        orientations: { type: "array", items: { $ref: "#/components/schemas/SwitchPlateOrientation" } },
        mechs: { type: "array", items: { $ref: "#/components/schemas/SwitchPlateMech" } },
        colourCombinations: {
          type: "array",
          items: { $ref: "#/components/schemas/SwitchPlateColourCombination" },
        },
        styleColourCombinations: {
          type: "array",
          items: { $ref: "#/components/schemas/SwitchPlateStyleColourCombination" },
        },
      },
    },
    SuccessListStyles: {
      type: "object",
      properties: {
        success: { type: "boolean", example: true },
        message: { type: "string" },
        result: { type: "array", items: { $ref: "#/components/schemas/SwitchPlateStyle" } },
      },
    },
    SuccessListColours: {
      type: "object",
      properties: {
        success: { type: "boolean", example: true },
        message: { type: "string" },
        result: { type: "array", items: { $ref: "#/components/schemas/SwitchPlateColour" } },
      },
    },
    SuccessListOrientations: {
      type: "object",
      properties: {
        success: { type: "boolean", example: true },
        message: { type: "string" },
        result: { type: "array", items: { $ref: "#/components/schemas/SwitchPlateOrientation" } },
      },
    },
    SuccessListMechs: {
      type: "object",
      properties: {
        success: { type: "boolean", example: true },
        message: { type: "string" },
        result: { type: "array", items: { $ref: "#/components/schemas/SwitchPlateMech" } },
      },
    },
    SuccessListColourCombinations: {
      type: "object",
      properties: {
        success: { type: "boolean", example: true },
        message: { type: "string" },
        result: {
          type: "array",
          items: { $ref: "#/components/schemas/SwitchPlateColourCombination" },
        },
      },
    },
    SuccessListStyleColourCombinations: {
      type: "object",
      properties: {
        success: { type: "boolean", example: true },
        message: { type: "string" },
        result: {
          type: "array",
          items: { $ref: "#/components/schemas/SwitchPlateStyleColourCombination" },
        },
      },
    },
    SuccessFullConfig: {
      type: "object",
      properties: {
        success: { type: "boolean", example: true },
        message: { type: "string" },
        result: { $ref: "#/components/schemas/FullSwitchPlateConfig" },
      },
    },
  },
} as const;

const switchPlateResponses = {
  styles: {
    "200": {
      description: "Catalog styles",
      content: { "application/json": { schema: { $ref: "#/components/schemas/SuccessListStyles" } } },
    },
    "500": {
      description: "Database or server error",
      content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
    },
  },
  colours: {
    "200": {
      description: "Catalog colours",
      content: { "application/json": { schema: { $ref: "#/components/schemas/SuccessListColours" } } },
    },
    "500": {
      description: "Database or server error",
      content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
    },
  },
  orientations: {
    "200": {
      description: "Catalog orientations",
      content: {
        "application/json": { schema: { $ref: "#/components/schemas/SuccessListOrientations" } },
      },
    },
    "500": {
      description: "Database or server error",
      content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
    },
  },
  mechs: {
    "200": {
      description: "Catalog mechanism types",
      content: { "application/json": { schema: { $ref: "#/components/schemas/SuccessListMechs" } } },
    },
    "500": {
      description: "Database or server error",
      content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
    },
  },
  colourCombinations: {
    "200": {
      description: "Colour combinations with nested colour refs",
      content: {
        "application/json": { schema: { $ref: "#/components/schemas/SuccessListColourCombinations" } },
      },
    },
    "500": {
      description: "Database or server error",
      content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
    },
  },
  styleColourCombinations: {
    "200": {
      description: "Per-style allowed colour combinations",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/SuccessListStyleColourCombinations" },
        },
      },
    },
    "500": {
      description: "Database or server error",
      content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
    },
  },
  config: {
    "200": {
      description: "All catalog data in one payload (for configurator UIs)",
      content: { "application/json": { schema: { $ref: "#/components/schemas/SuccessFullConfig" } } },
    },
    "500": {
      description: "Database or server error",
      content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
    },
  },
} as const;

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Switch Configurator Plan API",
      version: "1.0.0",
      description:
        "Read-only switch plate catalog API. Routes are mounted at `/api` (see paths below).",
    },
    servers: [{ url: "/", description: "This server (use the same host/port as the app)" }],
    tags: [
      { name: "Health", description: "Process liveness" },
      { name: "Switch plate", description: "Configurator catalog lookups" },
    ],
    paths: {
      "/": {
        get: {
          tags: ["Health"],
          summary: "Root health check",
          description: "Plain text body confirming the API process is running.",
          responses: {
            "200": {
              description: "OK",
              content: { "text/plain": { schema: { type: "string", example: "Switch Configurator Plan BE is running" } } },
            },
          },
        },
      },
      "/api/v1/switch-plate/styles": {
        get: {
          tags: ["Switch plate"],
          summary: "List switch plate styles",
          responses: switchPlateResponses.styles,
        },
      },
      "/api/v1/switch-plate/colours": {
        get: {
          tags: ["Switch plate"],
          summary: "List switch plate colours",
          responses: switchPlateResponses.colours,
        },
      },
      "/api/v1/switch-plate/orientations": {
        get: {
          tags: ["Switch plate"],
          summary: "List switch plate orientations",
          responses: switchPlateResponses.orientations,
        },
      },
      "/api/v1/switch-plate/mechs": {
        get: {
          tags: ["Switch plate"],
          summary: "List switch plate mechanism types",
          responses: switchPlateResponses.mechs,
        },
      },
      "/api/v1/switch-plate/colour-combinations": {
        get: {
          tags: ["Switch plate"],
          summary: "List colour combinations",
          responses: switchPlateResponses.colourCombinations,
        },
      },
      "/api/v1/switch-plate/style-colour-combinations": {
        get: {
          tags: ["Switch plate"],
          summary: "List style-specific colour combinations",
          responses: switchPlateResponses.styleColourCombinations,
        },
      },
      "/api/v1/switch-plate/config": {
        get: {
          tags: ["Switch plate"],
          summary: "Aggregated configurator catalog",
          responses: switchPlateResponses.config,
        },
      },
    },
    components,
  },
  apis: [],
});
