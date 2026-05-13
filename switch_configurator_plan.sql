--
-- PostgreSQL database dump
--

\restrict BmCF2uvYubvmOcTWrSjSshCVmMtopvamANZ2ld61ZZXbr7NahnWCytRNV8qZRVy

-- Dumped from database version 14.20 (Homebrew)
-- Dumped by pg_dump version 14.20 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: angelriapurnamasari
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO angelriapurnamasari;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: angelriapurnamasari
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO angelriapurnamasari;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: angelriapurnamasari
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: switch_plate_colour_combinations; Type: TABLE; Schema: public; Owner: angelriapurnamasari
--

CREATE TABLE public.switch_plate_colour_combinations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    code character varying(20) NOT NULL,
    backplate_colour_id uuid NOT NULL,
    faceplate_colour_id uuid NOT NULL,
    mech_colour_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.switch_plate_colour_combinations OWNER TO angelriapurnamasari;

--
-- Name: switch_plate_colours; Type: TABLE; Schema: public; Owner: angelriapurnamasari
--

CREATE TABLE public.switch_plate_colours (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    code character varying(20) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.switch_plate_colours OWNER TO angelriapurnamasari;

--
-- Name: switch_plate_mechs; Type: TABLE; Schema: public; Owner: angelriapurnamasari
--

CREATE TABLE public.switch_plate_mechs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    code character varying(20) NOT NULL,
    supports_colour boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.switch_plate_mechs OWNER TO angelriapurnamasari;

--
-- Name: switch_plate_orientations; Type: TABLE; Schema: public; Owner: angelriapurnamasari
--

CREATE TABLE public.switch_plate_orientations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    code character varying(20) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.switch_plate_orientations OWNER TO angelriapurnamasari;

--
-- Name: switch_plate_style_colour_combinations; Type: TABLE; Schema: public; Owner: angelriapurnamasari
--

CREATE TABLE public.switch_plate_style_colour_combinations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    style_id uuid NOT NULL,
    colour_combination_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.switch_plate_style_colour_combinations OWNER TO angelriapurnamasari;

--
-- Name: switch_plate_styles; Type: TABLE; Schema: public; Owner: angelriapurnamasari
--

CREATE TABLE public.switch_plate_styles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    code character varying(20) NOT NULL,
    supports_custom_colours boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.switch_plate_styles OWNER TO angelriapurnamasari;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: angelriapurnamasari
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	260512040101	CreateSwitchPlateStyles20260512040101
2	260512040102	CreateSwitchPlateColours20260512040102
3	260512040103	CreateSwitchPlateOrientations20260512040103
4	260512040104	CreateSwitchPlateMechs20260512040104
5	260512040105	CreateSwitchPlateColourCombinations20260512040105
6	260512040106	CreateSwitchPlateStyleColourCombinations20260512040106
\.


--
-- Data for Name: switch_plate_colour_combinations; Type: TABLE DATA; Schema: public; Owner: angelriapurnamasari
--

COPY public.switch_plate_colour_combinations (id, name, code, backplate_colour_id, faceplate_colour_id, mech_colour_id, created_at, updated_at, deleted_at) FROM stdin;
16c4f57e-1b81-4df6-9d35-08c726058f78	Full White	WWW	3d4c51b8-6222-43f5-9f41-7a551c149563	3d4c51b8-6222-43f5-9f41-7a551c149563	3d4c51b8-6222-43f5-9f41-7a551c149563	2026-05-13 13:58:34.623553+08	2026-05-13 13:58:34.623553+08	\N
267bf310-2eec-4fc5-bf1c-8aa328b8d6aa	Full Black	BBB	1d814200-ae84-4ed5-92d8-cb70ab49ceb6	1d814200-ae84-4ed5-92d8-cb70ab49ceb6	1d814200-ae84-4ed5-92d8-cb70ab49ceb6	2026-05-13 13:58:34.623568+08	2026-05-13 13:58:34.623568+08	\N
\.


--
-- Data for Name: switch_plate_colours; Type: TABLE DATA; Schema: public; Owner: angelriapurnamasari
--

COPY public.switch_plate_colours (id, name, code, created_at, updated_at, deleted_at) FROM stdin;
1d814200-ae84-4ed5-92d8-cb70ab49ceb6	Black	B	2026-05-13 13:58:34.59456+08	2026-05-13 13:58:34.59456+08	\N
3d4c51b8-6222-43f5-9f41-7a551c149563	White	W	2026-05-13 13:58:34.594872+08	2026-05-13 13:58:34.594872+08	\N
\.


--
-- Data for Name: switch_plate_mechs; Type: TABLE DATA; Schema: public; Owner: angelriapurnamasari
--

COPY public.switch_plate_mechs (id, name, code, supports_colour, created_at, updated_at, deleted_at) FROM stdin;
c8afea37-87d7-4655-b9c9-0e4a43cb0d86	10A Switch	10	t	2026-05-13 13:58:34.604119+08	2026-05-13 13:58:34.604119+08	\N
66d7e122-ddff-41be-b8b6-1f7a82c58712	USB A	USBA	f	2026-05-13 13:58:34.604172+08	2026-05-13 13:58:34.604172+08	\N
5a675419-bc03-49e4-a3b8-be2c3c0413eb	16A Switch	16	t	2026-05-13 13:58:34.604133+08	2026-05-13 13:58:34.604133+08	\N
f4ef1934-4420-43e9-81d7-a85c14c3fefe	USB A/C	USBAC	f	2026-05-13 13:58:34.604533+08	2026-05-13 13:58:34.604533+08	\N
10070901-9913-479f-9a0f-65cdb5142ada	TV	TV	f	2026-05-13 13:58:34.613285+08	2026-05-13 13:58:34.613285+08	\N
8017ad05-7b51-40d2-9c6d-bdc403b79b86	Satellite	SAT	f	2026-05-13 13:58:34.613041+08	2026-05-13 13:58:34.613041+08	\N
d48bd6a0-fd73-4f5a-9215-2bb17618fb8c	Data	DATA	f	2026-05-13 13:58:34.615168+08	2026-05-13 13:58:34.615168+08	\N
\.


--
-- Data for Name: switch_plate_orientations; Type: TABLE DATA; Schema: public; Owner: angelriapurnamasari
--

COPY public.switch_plate_orientations (id, name, code, created_at, updated_at, deleted_at) FROM stdin;
120dae68-a77d-4cd6-b8b4-31667de897a8	Horizontal	H	2026-05-13 13:58:34.599831+08	2026-05-13 13:58:34.599831+08	\N
cee5ace1-3914-4da0-b49f-a3881dcc6bcd	Vertical	V	2026-05-13 13:58:34.599874+08	2026-05-13 13:58:34.599874+08	\N
\.


--
-- Data for Name: switch_plate_style_colour_combinations; Type: TABLE DATA; Schema: public; Owner: angelriapurnamasari
--

COPY public.switch_plate_style_colour_combinations (id, style_id, colour_combination_id, created_at, updated_at, deleted_at) FROM stdin;
7c0e6012-801f-47d7-abc4-dba7d01c1ca6	72604d56-cc75-4fcf-bfce-90abbbbbd134	16c4f57e-1b81-4df6-9d35-08c726058f78	2026-05-13 13:58:34.635013+08	2026-05-13 13:58:34.635013+08	\N
fb28c43b-2010-4c3b-bd61-1062c8db93d0	e2c42deb-07ee-42b6-9c1b-d20a321184c7	16c4f57e-1b81-4df6-9d35-08c726058f78	2026-05-13 13:58:34.635054+08	2026-05-13 13:58:34.635054+08	\N
14bb0ba0-61ec-4ccf-9140-35542793e43b	e3ea564d-d511-4ca5-b1a5-2afbcefe31ac	16c4f57e-1b81-4df6-9d35-08c726058f78	2026-05-13 13:58:34.635107+08	2026-05-13 13:58:34.635107+08	\N
5bfb6770-6acb-442c-927f-eeb0857e2b0e	e3ea564d-d511-4ca5-b1a5-2afbcefe31ac	267bf310-2eec-4fc5-bf1c-8aa328b8d6aa	2026-05-13 13:58:34.635379+08	2026-05-13 13:58:34.635379+08	\N
\.


--
-- Data for Name: switch_plate_styles; Type: TABLE DATA; Schema: public; Owner: angelriapurnamasari
--

COPY public.switch_plate_styles (id, name, code, supports_custom_colours, created_at, updated_at, deleted_at) FROM stdin;
ee7765d4-db74-42c3-9c58-45d7c54bc927	Vision	VSW	t	2026-05-13 13:58:34.565231+08	2026-05-13 13:58:34.565231+08	\N
72604d56-cc75-4fcf-bfce-90abbbbbd134	Horizon	HSW	f	2026-05-13 13:58:34.573801+08	2026-05-13 13:58:34.573801+08	\N
e2c42deb-07ee-42b6-9c1b-d20a321184c7	Eclipse	ESW	f	2026-05-13 13:58:34.582995+08	2026-05-13 13:58:34.582995+08	\N
e3ea564d-d511-4ca5-b1a5-2afbcefe31ac	Infinity	ISW	f	2026-05-13 13:58:34.579327+08	2026-05-13 13:58:34.579327+08	\N
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: angelriapurnamasari
--

SELECT pg_catalog.setval('public.migrations_id_seq', 6, true);


--
-- Name: switch_plate_orientations PK_0f038e623c871f0c6d755ee8afd; Type: CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_orientations
    ADD CONSTRAINT "PK_0f038e623c871f0c6d755ee8afd" PRIMARY KEY (id);


--
-- Name: switch_plate_style_colour_combinations PK_248415f056e7dc56db27307eeb1; Type: CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_style_colour_combinations
    ADD CONSTRAINT "PK_248415f056e7dc56db27307eeb1" PRIMARY KEY (id, style_id, colour_combination_id);


--
-- Name: switch_plate_styles PK_40a2450ff0a218a9bc91d8911de; Type: CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_styles
    ADD CONSTRAINT "PK_40a2450ff0a218a9bc91d8911de" PRIMARY KEY (id);


--
-- Name: switch_plate_colours PK_5f4226b24299f01b68d2b307b79; Type: CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_colours
    ADD CONSTRAINT "PK_5f4226b24299f01b68d2b307b79" PRIMARY KEY (id);


--
-- Name: switch_plate_mechs PK_80cfcb38bdf4bbff74e4fb52e7d; Type: CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_mechs
    ADD CONSTRAINT "PK_80cfcb38bdf4bbff74e4fb52e7d" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: switch_plate_colour_combinations PK_ae229381fd128c854765fb09cd7; Type: CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_colour_combinations
    ADD CONSTRAINT "PK_ae229381fd128c854765fb09cd7" PRIMARY KEY (id);


--
-- Name: switch_plate_orientations UQ_1f7796880bd4dfcfebdb264b218; Type: CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_orientations
    ADD CONSTRAINT "UQ_1f7796880bd4dfcfebdb264b218" UNIQUE (code);


--
-- Name: switch_plate_colour_combinations UQ_21560eef2472a735b6db3b6def1; Type: CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_colour_combinations
    ADD CONSTRAINT "UQ_21560eef2472a735b6db3b6def1" UNIQUE (code);


--
-- Name: switch_plate_styles UQ_7dd531bd68f6f246f39d8c1fbf3; Type: CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_styles
    ADD CONSTRAINT "UQ_7dd531bd68f6f246f39d8c1fbf3" UNIQUE (code);


--
-- Name: switch_plate_colours UQ_8580d6d0b7112bddca5b6571dc4; Type: CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_colours
    ADD CONSTRAINT "UQ_8580d6d0b7112bddca5b6571dc4" UNIQUE (code);


--
-- Name: switch_plate_mechs UQ_a2a6eda4e4b03b4d31554a25b97; Type: CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_mechs
    ADD CONSTRAINT "UQ_a2a6eda4e4b03b4d31554a25b97" UNIQUE (code);


--
-- Name: switch_plate_colour_combinations fk_colour_combinations_backplate_colour; Type: FK CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_colour_combinations
    ADD CONSTRAINT fk_colour_combinations_backplate_colour FOREIGN KEY (backplate_colour_id) REFERENCES public.switch_plate_colours(id);


--
-- Name: switch_plate_colour_combinations fk_colour_combinations_faceplate_colour; Type: FK CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_colour_combinations
    ADD CONSTRAINT fk_colour_combinations_faceplate_colour FOREIGN KEY (faceplate_colour_id) REFERENCES public.switch_plate_colours(id);


--
-- Name: switch_plate_colour_combinations fk_colour_combinations_mech_colour; Type: FK CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_colour_combinations
    ADD CONSTRAINT fk_colour_combinations_mech_colour FOREIGN KEY (mech_colour_id) REFERENCES public.switch_plate_colours(id);


--
-- Name: switch_plate_style_colour_combinations fk_style_colour_combinations_colour_combination; Type: FK CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_style_colour_combinations
    ADD CONSTRAINT fk_style_colour_combinations_colour_combination FOREIGN KEY (colour_combination_id) REFERENCES public.switch_plate_colour_combinations(id) ON DELETE CASCADE;


--
-- Name: switch_plate_style_colour_combinations fk_style_colour_combinations_style; Type: FK CONSTRAINT; Schema: public; Owner: angelriapurnamasari
--

ALTER TABLE ONLY public.switch_plate_style_colour_combinations
    ADD CONSTRAINT fk_style_colour_combinations_style FOREIGN KEY (style_id) REFERENCES public.switch_plate_styles(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict BmCF2uvYubvmOcTWrSjSshCVmMtopvamANZ2ld61ZZXbr7NahnWCytRNV8qZRVy

