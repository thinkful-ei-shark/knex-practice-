BEGIN; 

INSERT INTO blogful_articles (title, date_published, content)
VALUES
('evi', now() - '21 days'::INTERVAL, 'test'), 
('nes', now() - '20 days'::INTERVAL, 'baby'),
('eva', now() - '19 days'::INTERVAL, 'sister'), 
('nemo', now() - '18 days'::INTERVAL, 'boyfriend'), 
('harun', now() - '17 days'::INTERVAL, 'brother')
;


COMMIT;