const { executeQuery } = require('./sqlService')

const createProduct = (newProduct, adminId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { prTitle, prAuthor, prPublisher, prYearofpublication, prStockquanlity, prPrice } = newProduct;

            // Tạo sản phẩm
            const checkProduct = await executeQuery(`SELECT * FROM PRODUCT WHERE PR_TITLE = N'${prTitle}'`);
            if (checkProduct.length > 0) {
                resolve({
                    status: 'ERR',
                    message: 'Tên sách đã tồn tại',
                });
                return;
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

            resolve({
                status: 'OK',
                message: 'Thêm sách mới thành công',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await executeQuery(`SELECT * FROM PRODUCT WHERE PR_ID = ${id}`)
            if (checkProduct.length === 0) {
                resolve({
                    status: 'ERR',
                    message: 'Không tìm thấy sách',
                })
            } else {
                let updateQuery = 'UPDATE PRODUCT SET '
                for (const key in data) {
                    if (key !== 'prId') {
                        const fieldName = `PR_${key.substring(2).toUpperCase()}`
                        updateQuery += `${fieldName} = N'${data[key]}', `
                    }
                }
                updateQuery = updateQuery.slice(0, -2)
                updateQuery += ` WHERE PR_ID = ${id}`
                await executeQuery(updateQuery)
                resolve({
                    status: 'OK',
                    message: 'Cập nhật thông tin sách thành công',
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await executeQuery(`SELECT * FROM PRODUCT WHERE PR_ID = ${id}`)
            if (checkProduct.length === 0) {
                resolve({
                    status: 'ERR',
                    message: 'Không tìm thấy sách',
                })
            } else {
                await executeQuery(`DELETE FROM PRODUCT WHERE PR_ID = ${id}`)
                resolve({
                    status: 'OK',
                    message: 'Xóa sách thành công'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProducts = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = 'SELECT * FROM PRODUCT'
            let countQuery = 'SELECT COUNT(*) as total FROM PRODUCT'

            if (filter) {
                const [field, value] = filter
                const fieldName = `PR_${field.substring(2).toUpperCase()}`
                query += ` WHERE ${fieldName} LIKE N'%${value}%'`
                countQuery += ` WHERE ${fieldName} LIKE N'%${value}%'`
            }

            if (sort) {
                const [order, field] = sort
                const fieldName = `PR_${field.substring(2).toUpperCase()}`
                query += ` ORDER BY ${fieldName} ${order === 'asc' ? 'ASC' : 'DESC'}`
            }

            query += ` OFFSET ${page * limit} ROWS FETCH NEXT ${limit} ROWS ONLY`

            const products = await executeQuery(query)
            const totalResult = await executeQuery(countQuery)
            const total = totalResult[0].total

            resolve({
                status: 'OK',
                message: 'Thành công',
                data: products,
                pagination: {
                    total,
                    currentPage: Number(page + 1),
                    totalPages: Math.ceil(total / limit)
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getProductDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await executeQuery(`SELECT * FROM PRODUCT WHERE PR_ID = ${id}`)
            if (product.length === 0) {
                resolve({
                    status: 'ERR',
                    message: 'Không tìm thấy sách',
                })
            } else {
                resolve({
                    status: 'OK',
                    message: 'Thành công',
                    data: product[0]
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const getFeaturedBooks = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `
                SELECT TOP 10 *
                FROM PRODUCT
                WHERE PR_FEATURED = 1
                ORDER BY PR_CREATEDAT DESC
            `;

            const products = await executeQuery(query);

            resolve({
                status: 'OK',
                message: 'Thành công',
                data: products
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductDetail,
    getFeaturedBooks
}