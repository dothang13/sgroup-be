-- Tìm các khách hàng chưa đặt bất kỳ đơn hàng nào.
-- Tìm sản phẩm có doanh thu cao nhất.


USE SGROUP_BE;
SELECT * FROM Products

-- CÂU 1: Lấy danh sách sản phẩm và tổng số lượng đã bán cho mỗi sản phẩm.

SELECT p.ProductName, SUM(o.Quantity) AS Quantity
FROM Products p
JOIN Orders o ON p.ProductId = o.ProductId
GROUP BY p.ProductName
ORDER BY Quantity DESC

-- CÂU 2: Tìm các khách hàng đã đặt nhiều hơn 1 đơn hàng.
SELECT c.FirstName FROM Customers c
JOIN Orders o ON c.CustomerId = o.CustomerId
GROUP BY c.FirstName
HAVING COUNT(c.FirstName) > 1

-- CÂU 3: Lấy thông tin các đơn hàng cùng với tên sản phẩm và tổng giá trị của mỗi đơn hàng.
SELECT p.ProductName, SUM(p.Price) AS Price
FROM Products p

RIGHT JOIN Orders o ON p.ProductID = o.ProductID
GROUP BY p.ProductName
ORDER BY Price DESC


SELECT * FROM Orders o

RIGHT JOIN Products p ON p.ProductID = o.ProductID
GROUP BY p.ProductName

