# PQ Desk

Bản thiết kế tương tác từ workbook mẫu PQ QUAY 01/T08. Dữ liệu trên giao diện được tạo để minh họa, không chứa khách hàng thật.

## Mở bản demo

Mở `dist/index.html` hoặc phục vụ thư mục `dist` bằng một HTTP server. Không cần cài dependencies, không gọi API bên ngoài.

```sh
python -m http.server 4173 --directory dist
```

Giao diện gồm Booking, Điều hành, Lịch, Thu tiền/công nợ, Danh mục giá, Sức chứa/SIM, Bản đồ chuyển đổi. Tạo/sửa booking và ghi nhận giao dịch chỉ thay đổi bộ nhớ của trang; reload đặt lại dữ liệu mẫu.

## Giới hạn

Chưa có backend, persistent database, login/phân quyền nghiệp vụ, import XLSX, gửi email/đặt dịch vụ, audit log bất biến, quản lý tồn kho hoặc khóa chỗ đồng thời. Giới hạn sức chứa và giá đều minh họa. Sites access riêng tư chỉ bảo vệ bản demo chủ tài khoản.

`dist/app.js` sử dụng native DOM và semantic HTML, có escape khi hiển thị dữ liệu nhập, kiểm tra tiền nguyên VND và xuất CSV chống formula injection. Giá trên booking là snapshot, tách khỏi bảng giá. Native dialogs hỗ trợ bàn phím/Escape.

WebMCP được feature-detect và đăng ký nếu trình duyệt hỗ trợ; xác minh API gốc chưa khả dụng trong môi trường kiểm thử hiện tại.

## Kiểm tra

15 kiểm tra tương tác đã đạt: đối chiếu tổng mẫu; tìm kiếm/rỗng/bộ lọc ngày; phân trang; đơn gồm phòng 2 phòng × 3 đêm + xe; ghi thu một phần; chặn ngày trả phòng sai; escape nội dung nhập; CSV không cộng lặp và chặn formula injection; đổi trạng thái điều hành; đổi giá không sửa booking cũ; trả NCC tách khỏi thu khách; bản đồ 20 tab; 21 tổ hợp màn hình × viewport; đóng dialog bằng Escape; không có page runtime error.

Đã kiểm tra cả 7 màn hình tại 1512, 1024 và 390 px, không có tràn ngang toàn trang. Các bảng lớn và lịch tuần cuộn trong khung; booking trên điện thoại chuyển thành thẻ.

Đây là kiểm tra demo cục bộ, không chứng minh nhập dữ liệu thật, tài chính nguồn, quyền backend, lưu trữ hay giao dịch đồng thời.
