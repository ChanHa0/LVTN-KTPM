const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDF = async (users, products, orders, carts) => {
    try {
        // Tạo một tài liệu PDF mới
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream('data.pdf'));

        // Thêm nội dung vào PDF
        doc.fontSize(25).text('Tổng hợp dữ liệu', { align: 'center' });

        // Thêm dữ liệu người dùng
        doc.moveDown();
        doc.fontSize(20).text('Người dùng:', { underline: true });
        users.forEach(user => {
            doc.fontSize(12).text(`Tên: ${user.uName}, Email: ${user.uEmail}`);
        });
        doc.moveDown();

        // Thêm dữ liệu sản phẩm
        doc.fontSize(20).text('Sản phẩm:', { underline: true });
        products.forEach(product => {
            doc.fontSize(12).text(`Tiêu đề: ${product.prTitle}, Giá: ${product.prPrice}`);
        });
        doc.moveDown();

        // Thêm dữ liệu đơn hàng
        doc.fontSize(20).text('Đơn hàng:', { underline: true });
        orders.forEach(order => {
            doc.fontSize(12).text(`ID người dùng: ${order.uId}, Tổng tiền: ${order.oTotalAmount}`);
        });
        doc.moveDown();

        // Thêm dữ liệu giỏ hàng
        doc.fontSize(20).text('Giỏ hàng:', { underline: true });
        carts.forEach(cart => {
            doc.fontSize(12).text(`ID người dùng: ${cart.uId}, Trạng thái: ${cart.cStatus}`);
        });

        // Kết thúc và lưu file PDF
        doc.end();
        console.log('File PDF đã được tạo thành công!');
    } catch (error) {
        console.error('Lỗi khi tạo file PDF:', error);
    }
};

module.exports = generatePDF;