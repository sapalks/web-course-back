--
-- PostgreSQL database dump
--

-- Dumped from database version 11.11 (Ubuntu 11.11-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.0

-- Started on 2021-05-24 21:47:28

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
-- TOC entry 3054 (class 1262 OID 16384)
-- Name: db; Type: DATABASE; Schema: -; Owner: postgres
--

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
-- TOC entry 204 (class 1259 OID 32769)
-- Name: categoryid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categoryid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

SET default_tablespace = '';

--
-- TOC entry 200 (class 1259 OID 16446)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer DEFAULT nextval('public.categoryid_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL
);


--
-- TOC entry 203 (class 1259 OID 16455)
-- Name: sub_categoryid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sub_categoryid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 198 (class 1259 OID 16426)
-- Name: sub_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sub_category (
    id integer DEFAULT nextval('public.sub_categoryid_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    parent_category_id integer NOT NULL
);



--
-- TOC entry 208 (class 1259 OID 90113)
-- Name: allcategories; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.allcategories AS
 SELECT c.name AS maincategory,
    sc.name AS subcategory,
    c.id AS mainid,
    sc.id AS subid
   FROM (public.category c
     JOIN public.sub_category sc ON ((sc.parent_category_id = c.id)));



--
-- TOC entry 197 (class 1259 OID 16400)
-- Name: message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message (
    sender_id integer,
    receiver_id integer,
    text text NOT NULL,
    date timestamp with time zone NOT NULL
);



--
-- TOC entry 202 (class 1259 OID 16453)
-- Name: noticeid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.noticeid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- TOC entry 205 (class 1259 OID 32779)
-- Name: notice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notice (
    id integer DEFAULT nextval('public.noticeid_seq'::regclass) NOT NULL,
    purchase_name character varying(100) NOT NULL,
    owner_id integer,
    description character varying(1000),
    price integer DEFAULT '-1'::integer NOT NULL,
    photo_url character varying(1000),
    safe_deal boolean DEFAULT false NOT NULL,
    delivery_possibility boolean DEFAULT false NOT NULL,
    post_date timestamp with time zone DEFAULT now() NOT NULL
);



--
-- TOC entry 206 (class 1259 OID 32793)
-- Name: notice_filter; Type: VIEW; Schema: public; Owner: postgres
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
-- Name: notice_sub_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notice_sub_category (
    noticeid integer NOT NULL,
    sub_categoryid integer NOT NULL
);



--
-- TOC entry 209 (class 1259 OID 98305)
-- Name: noticeview; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.noticeview AS
 SELECT notice.id,
    notice.purchase_name,
    notice.price,
    notice.photo_url
   FROM public.notice
  ORDER BY notice.post_date;



--
-- TOC entry 207 (class 1259 OID 73729)
-- Name: password; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password (
    text character varying(200) NOT NULL,
    user_id integer NOT NULL
);



--
-- TOC entry 201 (class 1259 OID 16451)
-- Name: userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- TOC entry 196 (class 1259 OID 16385)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer DEFAULT nextval('public.userid_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    rate numeric(2,1) DEFAULT 0 NOT NULL,
    join_date date NOT NULL,
    num_reviews integer DEFAULT 0 NOT NULL,
    num_subscribtions integer DEFAULT 0 NOT NULL,
    num_subscribers integer DEFAULT 0 NOT NULL,
    phone_number character varying(20) DEFAULT 0 NOT NULL,
    city character varying(100) NOT NULL
);


--
-- TOC entry 3042 (class 0 OID 16446)
-- Dependencies: 200
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category (id, name) VALUES (1, 'Авто');
INSERT INTO public.category (id, name) VALUES (2, 'Недвижимость');
INSERT INTO public.category (id, name) VALUES (3, 'Работа');
INSERT INTO public.category (id, name) VALUES (4, 'Услуги');
INSERT INTO public.category (id, name) VALUES (5, 'Личные вещи');


--
-- TOC entry 3039 (class 0 OID 16400)
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
-- TOC entry 3047 (class 0 OID 32779)
-- Dependencies: 205
-- Data for Name: notice; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (34, 'Подгузники', 6, 'Памперсы звезды. Реликвия', 30000, 'https://helptomama.ru/upload/iblock/9f1/9f1a29f518f53c3b6e1367da20105d2d.jpeg', true, true, '2021-08-23 16:50:57.136817+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (35, 'iPhone x3e9', 5, 'Works good', 75000, 'https://site.ru/img.jpeg', false, true, '2021-08-24 16:50:57.136817+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (36, 'Трубочки', 4, 'можно пить сок', 100, 'https://site.ru/img.jpeg', false, false, '2021-07-24 16:50:57.136817+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (37, 'Тапочки', 3, 'меховые', 800, 'https://site.ru/img.jpeg', false, true, '2020-08-24 16:50:57.136817+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (38, 'Дрындулет', 6, NULL, 800, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-04-18 22:02:48+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (94, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:10+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (73, 'Дрындулет', 6, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-04 22:58:04+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (74, 'Дрындулет', 6, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-04 23:23:39+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (75, 'Лабораторная по БД на заказ', 59, NULL, 1000, 'https://dark2web.net/proxy.php?image=http%3A%2F%2Fs018.radikal.ru%2Fi525%2F1701%2F06%2Fb8d64efafed2.png&hash=ea1b5779d92471b3787d18ec8890108d', false, false, '2021-05-13 14:37:23+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (76, 'Лабораторная по БД на заказ', 59, NULL, 1000, 'https://dark2web.net/proxy.php?image=http%3A%2F%2Fs018.radikal.ru%2Fi525%2F1701%2F06%2Fb8d64efafed2.png&hash=ea1b5779d92471b3787d18ec8890108d', false, false, '2021-05-13 14:38:22+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (77, 'Лабораторная по БД на заказ', 59, NULL, 1000, 'https://dark2web.net/proxy.php?image=http%3A%2F%2Fs018.radikal.ru%2Fi525%2F1701%2F06%2Fb8d64efafed2.png&hash=ea1b5779d92471b3787d18ec8890108d', false, false, '2021-05-13 14:42:22+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (78, 'Лабораторная по БД на заказ', 59, NULL, 1000, 'https://dark2web.net/proxy.php?image=http%3A%2F%2Fs018.radikal.ru%2Fi525%2F1701%2F06%2Fb8d64efafed2.png&hash=ea1b5779d92471b3787d18ec8890108d', false, false, '2021-05-13 14:42:55+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (79, 'Лабораторная по БД на заказ', 59, NULL, 1000, 'https://dark2web.net/proxy.php?image=http%3A%2F%2Fs018.radikal.ru%2Fi525%2F1701%2F06%2Fb8d64efafed2.png&hash=ea1b5779d92471b3787d18ec8890108d', false, false, '2021-05-13 14:48:19+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (80, 'Поедание блинчиков на спор', 59, 'Блинчики с вас', 500, NULL, false, false, '2021-05-13 15:16:53+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (81, 'Нервотрепатель', 59, NULL, 9000, NULL, false, false, '2021-05-13 15:34:07+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (82, 'Политический деятель', 59, 'Я всё могу', 300, 'https://newrezume.org/_nw/195/07128429.jpg', false, false, '2021-05-13 15:39:52+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (83, 'Дрындулет', 59, NULL, 3, 'https://static.pakwheels.com/2015/04/Joshua_Tree_-_Love_car-e1430128727481.jpg', false, false, '2021-05-13 15:42:52+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (84, 'молния маквин', 59, NULL, 777777, 'https://yt3.ggpht.com/ytc/AAUvwng3xViUaSyBB8STCrdxuFqGg5eusH_-UUrRlrsU=s900-c-k-c0x00ffffff-no-rj', false, false, '2021-05-13 15:45:16+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (85, 'Трёшка в двушке', 59, 'Квартира расположена на 2-этаже 2-этажного дома, общая площадь -103 кв. метра, полностью готовая к проживанию. В этой квартире вы оцените настоящий домашний комфорт и уют. Отопление.', 5000000, 'https://vtoroydom.com/wa-data/public/photos/50/06/650/650.970.jpg', false, false, '2021-05-13 15:53:04+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (86, 'Земля в Мордоре', 59, 'Даром не нужна', 0, 'https://cdna.artstation.com/p/assets/images/images/004/212/978/large/ayoub-ziani-mordor.jpg?1481395159', false, false, '2021-05-13 15:58:42+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (87, 'земля в мордовии', 59, NULL, 300666, 'https://сезоны-года.рф/sites/default/files/images/okruzhayushhij_mir/Mordoviy_9.jpg', false, false, '2021-05-13 16:23:50+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (88, 'Tеремок', 59, NULL, 1000, 'https://i.ytimg.com/vi/BblEanY2xY8/maxresdefault.jpg', false, false, '2021-05-13 17:26:18+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (95, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:10+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (96, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:11+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (97, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:11+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (90, 'боты', 59, NULL, 200, 'https://allforprofi.ru/upload/iblock/c3c/c3c8f79a00a54dc66f2363f3a6ad8f37.jpg', false, false, '2021-05-13 20:50:47+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (91, 'ЧЕПЧИК ', 59, NULL, 300, 'https://avatars.mds.yandex.net/get-mpic/1571231/img_id2634468099705356868.jpeg/300x400', true, true, '2021-05-13 20:54:22+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (89, 'Ползунки', 59, 'Ползунки Фламинго 75703 Трикотажные ползунки для девочки от КотМарКот - это 100% свобода движений и комфорт', 580, 'https://img.akusherstvo.ru/images/magaz/kotmarkot-polzunki-flamingo-75703_belyj-1657005.jpg', true, true, '2021-05-13 20:20:24+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (98, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:12+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (99, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:12+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (100, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:13+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (101, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:13+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (102, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:14+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (103, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:14+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (104, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:15+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (105, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:15+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (106, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:16+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (107, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:16+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (108, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:17+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (109, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:17+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (110, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:18+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (111, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:18+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (112, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:18+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (113, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:19+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (114, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:19+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (115, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:20+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (116, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:20+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (117, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:20+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (118, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:21+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (119, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:21+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (120, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:21+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (121, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:22+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (122, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:22+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (123, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:22+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (124, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:23+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (125, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:23+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (126, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:23+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (127, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:24+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (128, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:24+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (129, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:25+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (130, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:25+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (131, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:25+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (132, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:26+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (133, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:26+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (134, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:27+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (135, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:27+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (136, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:27+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (137, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:28+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (138, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:28+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (139, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:28+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (140, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:29+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (141, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:29+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (142, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:30+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (143, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:30+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (144, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:30+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (145, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:31+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (146, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:31+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (147, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:31+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (148, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:32+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (149, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:32+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (150, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:32+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (151, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:33+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (152, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:33+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (153, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:33+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (154, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:34+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (155, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:34+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (156, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:34+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (157, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:35+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (158, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:35+04');
INSERT INTO public.notice (id, purchase_name, owner_id, description, price, photo_url, safe_deal, delivery_possibility, post_date) VALUES (159, 'Дрындулет', 60, NULL, 1000, 'http://3.bp.blogspot.com/-1FGAJCV82xM/VIOEmiCHcPI/AAAAAAAAACk/qV7gxPZncdA/s1600/Joshua_Tree_-_Love_car.jpg', true, false, '2021-05-13 22:22:36+04');


--
-- TOC entry 3041 (class 0 OID 16431)
-- Dependencies: 199
-- Data for Name: notice_sub_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (34, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (35, 9);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (36, 9);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (37, 9);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (79, 1);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (80, 2);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (81, 3);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (82, 4);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (83, 8);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (84, 7);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (85, 5);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (86, 6);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (87, 6);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (88, 5);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (89, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (90, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (91, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (94, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (95, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (96, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (97, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (98, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (99, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (100, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (101, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (102, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (103, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (104, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (105, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (106, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (107, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (108, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (109, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (110, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (111, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (112, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (113, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (114, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (115, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (116, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (117, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (118, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (119, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (120, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (121, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (122, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (123, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (124, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (125, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (126, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (127, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (128, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (129, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (130, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (131, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (132, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (133, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (134, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (135, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (136, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (137, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (138, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (139, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (140, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (141, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (142, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (143, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (144, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (145, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (146, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (147, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (148, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (149, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (150, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (151, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (152, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (153, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (154, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (155, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (156, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (157, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (158, 10);
INSERT INTO public.notice_sub_category (noticeid, sub_categoryid) VALUES (159, 10);


--
-- TOC entry 3048 (class 0 OID 73729)
-- Dependencies: 207
-- Data for Name: password; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.password (text, user_id) VALUES ('321ewq', 15);
INSERT INTO public.password (text, user_id) VALUES ('321ewq', 16);
INSERT INTO public.password (text, user_id) VALUES ('321ewq', 17);
INSERT INTO public.password (text, user_id) VALUES ('321ewq', 18);
INSERT INTO public.password (text, user_id) VALUES ('321ewq', 19);
INSERT INTO public.password (text, user_id) VALUES ('123qweQ', 52);
INSERT INTO public.password (text, user_id) VALUES ('123qweQ', 53);
INSERT INTO public.password (text, user_id) VALUES ('123qweQ', 54);
INSERT INTO public.password (text, user_id) VALUES ('123qweQ', 55);
INSERT INTO public.password (text, user_id) VALUES ('123qweQ', 56);
INSERT INTO public.password (text, user_id) VALUES ('qwe123Q', 57);
INSERT INTO public.password (text, user_id) VALUES ('qwe123Q', 58);
INSERT INTO public.password (text, user_id) VALUES ('123qweQ', 59);
INSERT INTO public.password (text, user_id) VALUES ('123qweQ', 60);
INSERT INTO public.password (text, user_id) VALUES ('qwe123Q', 61);


--
-- TOC entry 3040 (class 0 OID 16426)
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
-- TOC entry 3038 (class 0 OID 16385)
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
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (19, 'Анатолий', 0.0, '2021-05-10', 0, 0, 0, '700000000080', 'London');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (52, 'Николай', 0.0, '2021-05-10', 0, 0, 0, '77777777777', 'Добрый');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (53, 'Николай', 0.0, '2021-05-10', 0, 0, 0, '78777777777', 'Добрый');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (54, 'Николай', 0.0, '2021-05-10', 0, 0, 0, '76666666666', 'Добрый');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (55, 'Николай', 0.0, '2021-05-10', 0, 0, 0, '75555555555', 'Добрый');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (56, 'Николай', 0.0, '2021-05-10', 0, 0, 0, '74444444444', 'Добрый');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (57, 'What', 0.0, '2021-05-10', 0, 0, 0, '79999999999', 'thanks');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (58, 'What', 0.0, '2021-05-10', 0, 0, 0, '71111111111', 'thanks');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (59, 'Really', 0.0, '2021-05-11', 0, 0, 0, '73333333333', 'thanks');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (60, 'TT', 0.0, '2021-05-13', 0, 0, 0, '72222222222', 'Добрый');
INSERT INTO public."user" (id, name, rate, join_date, num_reviews, num_subscribtions, num_subscribers, phone_number, city) VALUES (61, 'Вячеслав', 0.0, '2021-05-14', 0, 0, 0, '79620000000', 'Добрый');


--
-- TOC entry 3055 (class 0 OID 0)
-- Dependencies: 204
-- Name: categoryid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoryid_seq', 5, true);


--
-- TOC entry 3056 (class 0 OID 0)
-- Dependencies: 202
-- Name: noticeid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.noticeid_seq', 160, true);


--
-- TOC entry 3057 (class 0 OID 0)
-- Dependencies: 203
-- Name: sub_categoryid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sub_categoryid_seq', 10, true);


--
-- TOC entry 3058 (class 0 OID 0)
-- Dependencies: 201
-- Name: userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userid_seq', 61, true);


--
-- TOC entry 2890 (class 2606 OID 49155)
-- Name: user User_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "User_phone_number_key" UNIQUE (phone_number);


--
-- TOC entry 2892 (class 2606 OID 16389)
-- Name: user User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 2902 (class 2606 OID 16450)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- TOC entry 2905 (class 2606 OID 32787)
-- Name: notice notice_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notice
    ADD CONSTRAINT notice_pkey PRIMARY KEY (id);


--
-- TOC entry 2900 (class 2606 OID 16435)
-- Name: notice_sub_category notice_sub_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notice_sub_category
    ADD CONSTRAINT notice_sub_category_pkey PRIMARY KEY (noticeid, sub_categoryid);


--
-- TOC entry 2894 (class 2606 OID 81926)
-- Name: user phone_number_u; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT phone_number_u UNIQUE (phone_number);


--
-- TOC entry 2897 (class 2606 OID 16430)
-- Name: sub_category sub_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_category
    ADD CONSTRAINT sub_category_pkey PRIMARY KEY (id);


--
-- TOC entry 2907 (class 2606 OID 81924)
-- Name: password user_id_PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password
    ADD CONSTRAINT "user_id_PK" PRIMARY KEY (user_id);


--
-- TOC entry 2903 (class 1259 OID 106498)
-- Name: notice_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX notice_index ON public.notice USING btree (post_date, owner_id);


--
-- TOC entry 2898 (class 1259 OID 106499)
-- Name: notice_sub_category_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX notice_sub_category_index ON public.notice_sub_category USING btree (noticeid, sub_categoryid);


--
-- TOC entry 2895 (class 1259 OID 106497)
-- Name: sub_category_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sub_category_index ON public.sub_category USING btree (parent_category_id);


--
-- TOC entry 2910 (class 2606 OID 41003)
-- Name: sub_category belong; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_category
    ADD CONSTRAINT belong FOREIGN KEY (parent_category_id) REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2908 (class 2606 OID 40978)
-- Name: message communicate; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT communicate FOREIGN KEY (sender_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2909 (class 2606 OID 40983)
-- Name: message communicate2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT communicate2 FOREIGN KEY (receiver_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2911 (class 2606 OID 40993)
-- Name: notice_sub_category fknotice_sub158898; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notice_sub_category
    ADD CONSTRAINT fknotice_sub158898 FOREIGN KEY (sub_categoryid) REFERENCES public.sub_category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2912 (class 2606 OID 40998)
-- Name: notice_sub_category fknotice_sub223591; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notice_sub_category
    ADD CONSTRAINT fknotice_sub223591 FOREIGN KEY (noticeid) REFERENCES public.notice(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2913 (class 2606 OID 40988)
-- Name: notice posted; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notice
    ADD CONSTRAINT posted FOREIGN KEY (owner_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2021-05-24 21:47:29

--
-- PostgreSQL database dump complete
--

