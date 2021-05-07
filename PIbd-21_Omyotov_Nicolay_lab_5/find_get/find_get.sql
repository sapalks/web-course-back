--
-- PostgreSQL database dump
--

-- Dumped from database version 11.11 (Ubuntu 11.11-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.0

-- Started on 2021-05-07 20:59:26

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
-- TOC entry 3051 (class 1262 OID 16384)
-- Name: db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE dd1s0f04ddlgh4 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'ru_RU.UTF-8';


\connect dd1s0f04ddlgh4

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

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    rate numeric(2,1) NOT NULL,
    join_date date NOT NULL,
    num_reviews integer NOT NULL,
    num_subscribtions integer NOT NULL,
    num_subscribers integer NOT NULL,
    phone_number bigint NOT NULL,
    city character varying(100) NOT NULL
);


--
-- TOC entry 200 (class 1259 OID 16446)
-- Name: category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


--
-- TOC entry 198 (class 1259 OID 16426)
-- Name: sub_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sub_category (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    parent_category_id integer NOT NULL
);


--
-- TOC entry 205 (class 1259 OID 32775)
-- Name: allcategories; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.allcategories AS
 SELECT c.name AS maincategory,
    sc.name AS subcategory
   FROM (public.category c
     JOIN public.sub_category sc ON ((sc.parent_category_id = c.id)));


--
-- TOC entry 204 (class 1259 OID 32769)
-- Name: categoryid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categoryid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 197 (class 1259 OID 16400)
-- Name: message; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.message (
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    text character varying(255) NOT NULL,
    date timestamp with time zone NOT NULL
);

--
-- TOC entry 206 (class 1259 OID 32779)
-- Name: notice; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notice (
    id integer NOT NULL,
    purchase_name character varying(100) NOT NULL,
    owner_id integer NOT NULL,
    description character varying(1000),
    price integer NOT NULL,
    photo_url character varying(1000),
    safe_deal boolean NOT NULL,
    delivery_possibility boolean NOT NULL,
    post_date timestamp with time zone DEFAULT now()
);


--
-- TOC entry 207 (class 1259 OID 32793)
-- Name: notice_filter; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.notice_filter AS
 SELECT notice.purchase_name,
    notice.description,
    notice.photo_url,
    notice.post_date
   FROM public.notice
  WHERE (notice.post_date > (now() - '1 day'::interval));


--
-- TOC entry 199 (class 1259 OID 16431)
-- Name: notice_sub_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notice_sub_category (
    noticeid integer NOT NULL,
    sub_categoryid integer NOT NULL
);

--
-- TOC entry 209 (class 1259 OID 73729)
-- Name: password; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password (
    text character varying(200) NOT NULL,
    user_id integer NOT NULL
);

--
-- TOC entry 202 (class 1259 OID 16453)
-- Name: noticeid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.noticeid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 208 (class 1259 OID 32797)
-- Name: noticeview; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.noticeview AS
 SELECT notice.purchase_name,
    notice.description,
    notice.photo_url,
    notice.post_date
   FROM public.notice;


--
-- TOC entry 203 (class 1259 OID 16455)
-- Name: sub_categoryid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sub_categoryid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 201 (class 1259 OID 16451)
-- Name: userid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 3039 (class 0 OID 16446)
-- Dependencies: 200
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category (id, name) VALUES (1, 'Авто');
INSERT INTO public.category (id, name) VALUES (2, 'Недвижимость');
INSERT INTO public.category (id, name) VALUES (3, 'Работа');
INSERT INTO public.category (id, name) VALUES (4, 'Услуги');
INSERT INTO public.category (id, name) VALUES (5, 'Личные вещи');


--
-- TOC entry 3036 (class 0 OID 16400)
-- Dependencies: 197
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.message (sender_id, receiver_id, text, date) VALUES (6, 2, 'Продаёте ещё?', '2021-08-23 16:50:57.136817+04');
INSERT INTO public.message (sender_id, receiver_id, text, date) VALUES (6, 2, 'Скидку не сделаете?', '2021-08-23 16:57:56.13681+04');
INSERT INTO public.message (sender_id, receiver_id, text, date) VALUES (2, 6, 'Скину 10%', '2021-08-23 17:01:35.186817+04');
INSERT INTO public.message (sender_id, receiver_id, text, date) VALUES (3, 4, 'Продаёте ещё?', '2021-08-23 16:50:57.136817+04');
INSERT INTO public.message (sender_id, receiver_id, text, date) VALUES (3, 2, 'Скидку не сделаете?', '2021-08-23 16:57:56.13681+04');
INSERT INTO public.message (sender_id, receiver_id, text, date) VALUES (2, 3, 'Скину 10%', '2021-08-23 17:01:35.186817+04');


--
-- TOC entry 3044 (class 0 OID 32779)
-- Dependencies: 206
-- Data for Name: notice; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (34, 'Подгузники', 6, 'Памперсы звезды. Реликвия', 30000, 'https://helptomama.ru/upload/iblock/9f1/9f1a29f518f53c3b6e1367da20105d2d.jpeg', true, true, '2021-08-23 16:50:57.136817+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (35, 'iPhone x3e9', 5, 'Works good', 75000, 'https://site.ru/img.jpeg', false, true, '2021-08-24 16:50:57.136817+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (36, 'Трубочки', 4, 'можно пить сок', 100, 'https://site.ru/img.jpeg', false, false, '2021-07-24 16:50:57.136817+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (37, 'Тапочки', 3, 'меховые', 800, 'https://site.ru/img.jpeg', false, true, '2020-08-24 16:50:57.136817+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (38, 'Дрындулет', 6, NULL, 800, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-04-18 22:02:48+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (73, 'Дрындулет', 6, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-04 22:58:04+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (74, 'Дрындулет', 6, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-04 23:23:39+04');


--
-- TOC entry 3038 (class 0 OID 16431)
-- Dependencies: 199
-- Data for Name: notice_sub_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (34, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (35, 9);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (36, 9);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (37, 9);


--
-- TOC entry 3045 (class 0 OID 73729)
-- Dependencies: 209
-- Data for Name: password; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.password (text, user_id) VALUES ('321ewq', 15);
INSERT INTO public.password (text, user_id) VALUES ('321ewq', 16);
INSERT INTO public.password (text, user_id) VALUES ('321ewq', 17);
INSERT INTO public.password (text, user_id) VALUES ('321ewq', 18);


--
-- TOC entry 3037 (class 0 OID 16426)
-- Dependencies: 198
-- Data for Name: sub_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sub_category (id, name, parent_category_id) VALUES (1, 'Бытовые услуги', 4);
INSERT INTO public.sub_category (id, name, parent_category_id) VALUES (2, 'Деловые услуги', 4);
INSERT INTO public.sub_category (id, name, parent_category_id) VALUES (3, 'Вакансии', 3);
INSERT INTO public.sub_category (id, name, parent_category_id) VALUES (4, 'Резюме', 3);
INSERT INTO public.sub_category (id, name, parent_category_id) VALUES (5, 'Все квартиры', 2);
INSERT INTO public.sub_category (id, name, parent_category_id) VALUES (6, 'Земельные участки', 2);
INSERT INTO public.sub_category (id, name, parent_category_id) VALUES (7, 'Автомобили', 1);
INSERT INTO public.sub_category (id, name, parent_category_id) VALUES (8, 'Мотоциклы и мототехника', 1);
INSERT INTO public.sub_category (id, name, parent_category_id) VALUES (9, 'Одежда, обувь, аксессуары', 5);
INSERT INTO public.sub_category (id, name, parent_category_id) VALUES (10, 'Детская одежда и обувь', 5);


--
-- TOC entry 3035 (class 0 OID 16385)
-- Dependencies: 196
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (2, 'Пупкин Василий', 0.0, '2020-08-09', 3, 4, 5, '79785678020', 'Кочубейск');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (3, 'Пупрышкин Генадий', 4.6, '2021-03-09', 34, 45, 5, '79785608020', 'Кочубейск');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (4, 'Вкин Адий', 3.7, '2021-03-12', 324, 43, 5, '79785688020', 'Дыра');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (5, 'Домо Фон', 2.6, '2021-10-15', 54, 5, 5, '79785698020', 'Ульяновск');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (6, 'Верка Сердючка', 5.0, '2019-03-08', 32, 25, 5, '79785568020', 'Иная планета');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (9, 'Анатолий', 0.0, '2021-05-03', 0, 0, 0, '71234567899', 'London');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (10, 'Анатолий', 0.0, '2021-05-03', 0, 0, 0, '70000000000', 'London');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (11, 'Анатолий', 0.0, '2021-05-03', 0, 0, 0, '70000000001', 'London');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (12, 'Анатолий', 0.0, '2021-05-04', 0, 0, 0, '70000000002', 'London');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (13, 'Анатолий', 0.0, '2021-05-04', 0, 0, 0, '70000000003', 'London');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (14, 'Анатолий', 0.0, '2021-05-04', 0, 0, 0, '70000000004', 'London');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (15, 'Анатолий', 0.0, '2021-05-04', 0, 0, 0, '70000000014', 'London');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (16, 'Анатолий', 0.2, '2021-05-04', 0, 0, 0, '70000000016', 'Бахчисарай');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (17, 'Анатолий', 0.0, '2021-05-04', 0, 0, 0, '70000000017', 'London');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (18, 'Анатолий', 0.0, '2021-05-04', 0, 0, 0, '70000000018', 'London');


--
-- TOC entry 3087 (class 0 OID 0)
-- Dependencies: 204
-- Name: categoryid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoryid_seq', 5, true);


--
-- TOC entry 3088 (class 0 OID 0)
-- Dependencies: 202
-- Name: noticeid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.noticeid_seq', 74, true);


--
-- TOC entry 3089 (class 0 OID 0)
-- Dependencies: 203
-- Name: sub_categoryid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sub_categoryid_seq', 10, true);


--
-- TOC entry 3090 (class 0 OID 0)
-- Dependencies: 201
-- Name: userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userid_seq', 18, true);


-- Completed on 2021-05-07 20:59:26

--
-- PostgreSQL database dump complete
--

