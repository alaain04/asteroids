
### Tables:

`USERS
id
name
email`

`ORDERS
id
user_id
product_id
quantity
created_at`

`PRODUCTS
id
name
price
category`


### Solution

SELECT 
    u.name AS USER_NAME, 
    u.email AS USER_EMAIL, 
    SUM(p.price * o.quantity) AS TOTAL_AMOUNT
FROM ORDERS o 
INNER JOIN PRODUCTS p 
    ON p.category = 'Electronics' AND p.id = o.product_id
INNER JOIN USERS u 
    ON o.user_id = u.id
GROUP BY 
    u.name, u.email
HAVING 
    COUNT(o.id) > 3 
    AND SUM(p.price * o.quantity) > 1000
ORDER BY 
    SUM(p.price * o.quantity) DESC;
