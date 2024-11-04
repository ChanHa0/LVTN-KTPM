const { executeQuery } = require('./sqlService');

const createProduct = async (newProduct, adminId) => {
    try {
        const { prTitle, prAuthor, prPublisher, prYearofpublication, prStockquanlity, prPrice } = newProduct;

        // Kiểm tra sản phẩm đã tồn tại
        const checkProduct = await executeQuery(`SELECT * FROM PRODUCT WHERE PR_TITLE = N'${prTitle}'`);
        if (checkProduct.length > 0) {
            return {
                status: 'ERR',
                message: 'Tên sách đã tồn tại',
            };
        }

        const insertProductQuery = `
            INSERT INTO PRODUCT (PR_TITLE, PR_AUTHOR, PR_PUBLISHER, PR_YEAROFPUBLICATION, PR_STOCKQUANLITY, PR_PRICE)
            OUTPUT INSERTED.PR_ID
            VALUES (N'${prTitle}', N'${prAuthor}', N'${prPublisher}', '${prYearofpublication}', ${prStockquanlity}, ${prPrice})
        `;

        const result = await executeQuery(insertProductQuery);
        const productId = result[0].PR_ID;

        // Thêm vào bảng MANAGEPRODUCT
        await executeQuery(`
            INSERT INTO MANAGEPRODUCT (A_ID, PR_ID)
            VALUES (${adminId}, ${productId})
        `);

        return {
            status: 'OK',
            message: 'Thêm sách mới thành công',
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const updateProduct = async (id, data) => {
    try {
        const checkProduct = await executeQuery(`SELECT * FROM PRODUCT WHERE PR_ID = ${id}`);
        if (checkProduct.length === 0) {
            return {
                status: 'ERR',
                message: 'Không tìm thấy sách',
            };
        }

        let updateQuery = 'UPDATE PRODUCT SET ';
        for (const key in data) {
            if (key !== 'prId') {
                const fieldName = `PR_${key.substring(2).toUpperCase()}`;
                updateQuery += `${fieldName} = N'${data[key]}', `;
            }
        }
        updateQuery = updateQuery.slice(0, -2);
        updateQuery += ` WHERE PR_ID = ${id}`;
        await executeQuery(updateQuery);

        return {
            status: 'OK',
            message: 'Cập nhật thông tin sách thành công',
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const deleteProduct = async (id) => {
    try {
        const checkProduct = await executeQuery(`SELECT * FROM PRODUCT WHERE PR_ID = ${id}`);
        if (checkProduct.length === 0) {
            return {
                status: 'ERR',
                message: 'Không tìm thấy sách',
            };
        }

        await executeQuery(`DELETE FROM PRODUCT WHERE PR_ID = ${id}`);
        return {
            status: 'OK',
            message: 'Xóa sách thành công'
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const getAllProducts = async (limit, page, sort, filter) => {
    try {
        let query = 'SELECT * FROM PRODUCT';
        let countQuery = 'SELECT COUNT(*) as total FROM PRODUCT';

        if (filter) {
            const [field, value] = filter;
            const fieldName = `PR_${field.substring(2).toUpperCase()}`;
            query += ` WHERE ${fieldName} LIKE N'%${value}%'`;
            countQuery += ` WHERE ${fieldName} LIKE N'%${value}%'`;
        }

        if (sort) {
            const [order, field] = sort;
            const fieldName = `PR_${field.substring(2).toUpperCase()}`;
            query += ` ORDER BY ${fieldName} ${order === 'asc' ? 'ASC' : 'DESC'}`;
        }

        query += ` OFFSET ${page * limit} ROWS FETCH NEXT ${limit} ROWS ONLY`;

        const products = await executeQuery(query);
        const totalResult = await executeQuery(countQuery);
        const total = totalResult[0].total;

        return {
            status: 'OK',
            message: 'Thành công',
            data: products,
            pagination: {
                total,
                currentPage: Number(page + 1),
                totalPages: Math.ceil(total / limit)
            }
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const getProductDetail = async (id) => {
    try {
        const product = await executeQuery(`SELECT * FROM PRODUCT WHERE PR_ID = ${id}`);
        if (product.length === 0) {
            return {
                status: 'ERR',
                message: 'Không tìm thấy sách',
            };
        }

        return {
            status: 'OK',
            message: 'Thành công',
            data: product[0]
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const getFeaturedBooks = async () => {
    try {
        const query = `
            SELECT TOP 10 *
            FROM PRODUCT
            WHERE PR_FEATURED = 1
            ORDER BY PR_CREATEDAT DESC
        `;

        const products = await executeQuery(query);

        return {
            status: 'OK',
            message: 'Thành công',
            data: products
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductDetail,
    getFeaturedBooks
};