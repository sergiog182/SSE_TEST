--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.1

-- Started on 2021-12-13 17:59:47 UTC

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16386)
-- Name: domains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.domains (
    id integer NOT NULL,
    domain character varying(250) NOT NULL,
    punycode boolean NOT NULL
);


ALTER TABLE public.domains OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16385)
-- Name: domains_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.domains_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.domains_id_seq OWNER TO postgres;

--
-- TOC entry 3324 (class 0 OID 0)
-- Dependencies: 209
-- Name: domains_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.domains_id_seq OWNED BY public.domains.id;


--
-- TOC entry 211 (class 1259 OID 16393)
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 32769)
-- Name: validated_domains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.validated_domains (
    id integer NOT NULL,
    domain_string character varying(250) NOT NULL,
    actual_domain integer NOT NULL,
    similar_domains character varying,
    similar_domains_puny character varying
);


ALTER TABLE public.validated_domains OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 32768)
-- Name: validated_domains_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.validated_domains_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.validated_domains_id_seq OWNER TO postgres;

--
-- TOC entry 3325 (class 0 OID 0)
-- Dependencies: 212
-- Name: validated_domains_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.validated_domains_id_seq OWNED BY public.validated_domains.id;


--
-- TOC entry 3173 (class 2604 OID 16389)
-- Name: domains id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domains ALTER COLUMN id SET DEFAULT nextval('public.domains_id_seq'::regclass);


--
-- TOC entry 3174 (class 2604 OID 32772)
-- Name: validated_domains id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.validated_domains ALTER COLUMN id SET DEFAULT nextval('public.validated_domains_id_seq'::regclass);


--
-- TOC entry 3177 (class 2606 OID 16391)
-- Name: domains domains_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domains
    ADD CONSTRAINT domains_pkey PRIMARY KEY (id);


--
-- TOC entry 3179 (class 2606 OID 32774)
-- Name: validated_domains validated_domains_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.validated_domains
    ADD CONSTRAINT validated_domains_pkey PRIMARY KEY (id);


--
-- TOC entry 3175 (class 1259 OID 24578)
-- Name: domain_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX domain_index ON public.domains USING btree (domain);


-- Completed on 2021-12-13 17:59:47 UTC

--
-- PostgreSQL database dump complete
--

